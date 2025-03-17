import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Flip } from 'gsap/dist/Flip';
import { preloadImages, preloadFonts } from '../lib/utils';
import { RowInstance } from './Row';
import { RowProps } from '../types/types';

interface PortfolioControllerProps {
  portfolioData: RowProps[];
}

const PortfolioController: React.FC<PortfolioControllerProps> = ({ portfolioData }) => {
  const isInitializedRef = useRef(false);
  const rowsArrRef = useRef<RowInstance[]>([]);
  const isOpenRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const currentRowRef = useRef(-1);
  const mouseenterTimelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || isInitializedRef.current) return;
    
    // Register plugins
    gsap.registerPlugin(Flip);

    const initializePortfolio = async () => {
      try {
        // Preload images and fonts
        await Promise.all([
          preloadImages('.cell__img-inner'),
          preloadFonts('gdf6msi')
        ]);
        
        // Remove loading class
        document.body.classList.remove('loading');

        // Initialize all rows
        const rows = [...document.querySelectorAll('.row')];
        const previewItems = [...document.querySelectorAll('.preview > .preview__item')];
        const cover = document.querySelector('.cover');
        const closeCtrl = document.querySelector('.preview > .preview__close');
        const body = document.body;

        // Reset the rows array
        rowsArrRef.current = [];
        
        // Create Row instances
        rows.forEach((row, position) => {
          rowsArrRef.current.push(new RowInstance(row as HTMLElement, previewItems[position] as HTMLElement));
        });

        // Add event listeners
        for (const row of rowsArrRef.current) {
          row.DOM.el?.addEventListener('mouseenter', () => {
            if (isOpenRef.current) return;
            
            gsap.killTweensOf([row.DOM.images, row.DOM.title]);
            
            mouseenterTimelineRef.current = gsap.timeline()
              .addLabel('start', 0)
              .to(row.DOM.images, {
                duration: 0.4,
                ease: 'power3',
                startAt: {
                  scale: 0.8,
                  xPercent: 20
                },
                scale: 1,
                xPercent: 0,
                opacity: 1,
                stagger: -0.035
              }, 'start')
              .set(row.DOM.title, { transformOrigin: '0% 50%' }, 'start')
              .to(row.DOM.title, {
                duration: 0.1,
                ease: 'power1.in',
                yPercent: -100,
                onComplete: () => row.DOM.titleWrap?.classList.add('cell__title--switch')
              }, 'start')
              .to(row.DOM.title, {
                duration: 0.5,
                ease: 'expo',
                startAt: {
                  yPercent: 100,
                  rotation: 15
                },
                yPercent: 0,
                rotation: 0
              }, 'start+=0.1');
          });
          
          row.DOM.el?.addEventListener('mouseleave', () => {
            if (isOpenRef.current) return;
            
            gsap.killTweensOf([row.DOM.images, row.DOM.title]);
            
            gsap.timeline()
              .addLabel('start')
              .to(row.DOM.images, {
                duration: 0.4,
                ease: 'power4',
                opacity: 0,
                scale: 0.8
              }, 'start')
              .to(row.DOM.title, {
                duration: 0.1,
                ease: 'power1.in',
                yPercent: -100,
                onComplete: () => row.DOM.titleWrap?.classList.remove('cell__title--switch')
              }, 'start')
              .to(row.DOM.title, {
                duration: 0.5,
                ease: 'expo',
                startAt: {
                  yPercent: 100,
                  rotation: 15
                },
                yPercent: 0,
                rotation: 0
              }, 'start+=0.1');
          });

          // Open a row and reveal the grid
          row.DOM.el?.addEventListener('click', () => {
            if (isAnimatingRef.current) return;
            isAnimatingRef.current = true;

            isOpenRef.current = true;

            currentRowRef.current = rowsArrRef.current.indexOf(row);
            
            gsap.killTweensOf([cover, rowsArrRef.current.map(r => r.DOM.title)]);

            gsap.timeline({
              onStart: () => {
                body.classList.add('oh');
                row.DOM.el?.classList.add('row--current');
                row.previewItem.DOM.el?.classList.add('preview__item--current');

                gsap.set(row.previewItem.DOM.images, { opacity: 0 });
                
                // set cover to be on top of the row and then animate it to cover the whole page
                if (cover) {
                  gsap.set(cover, {
                    height: row.DOM.el?.offsetHeight ? row.DOM.el.offsetHeight - 1 : 0, // minus border width
                    top: row.DOM.el?.getBoundingClientRect()?.['top'] || 0,
                    opacity: 1
                  });
                }
                
                gsap.set(row.previewItem.DOM.title, {
                  yPercent: -100,
                  rotation: 15,
                  transformOrigin: '100% 50%'
                });

                if (closeCtrl) {
                  closeCtrl.classList.add('preview__close--show');
                }
              },
              onComplete: () => isAnimatingRef.current = false
            })
            .addLabel('start', 0)
            .to(cover, {
              duration: 0.9,
              ease: 'power4.inOut',
              height: window.innerHeight,
              top: 0,
            }, 'start')
            // animate all the titles out
            .to(rowsArrRef.current.map(r => r.DOM.title), {
              duration: 0.5,
              ease: 'power4.inOut',
              yPercent: (_, target) => {
                const targetEl = target as HTMLElement;
                return targetEl.getBoundingClientRect()['top'] > (row.DOM.el?.getBoundingClientRect()['top'] || 0) ? 100 : -100;
              },
              rotation: 0
            }, 'start')
            .add(() => {
              if (mouseenterTimelineRef.current) {
                mouseenterTimelineRef.current.progress(1, false);
              }
              
              if (row.DOM.images.length && row.previewItem.DOM.grid) {
                const flipstate = Flip.getState(row.DOM.images, { simple: true });
                
                // Move images to the grid
                row.DOM.images.forEach(img => {
                  if (row.previewItem.DOM.grid) {
                    row.previewItem.DOM.grid.prepend(img);
                  }
                });
                
                Flip.from(flipstate, {
                  duration: 0.9,
                  ease: 'power4.inOut',
                  stagger: 0.04,
                })
                // other images in the grid
                .to(row.previewItem.DOM.images, {
                  duration: 0.9,
                  ease: 'power4.inOut',
                  startAt: { 
                    scale: 0, 
                    yPercent: () => gsap.utils.random(0, 200) 
                  },
                  scale: 1,
                  opacity: 1,
                  yPercent: 0,
                  stagger: 0.04
                }, 0.04 * (row.DOM.images.length));
              }
            }, 'start')
            .to(row.previewItem.DOM.title, {
              duration: 1,
              ease: 'power4.inOut',
              yPercent: 0,
              rotation: 0,
              onComplete: () => row.DOM.titleWrap?.classList.remove('cell__title--switch')
            }, 'start')
            .to(closeCtrl, {
              duration: 1,
              ease: 'power4.inOut',
              opacity: 1
            }, 'start');
          });
        }

        // Close the grid and show back the rows
        closeCtrl?.addEventListener('click', () => {
          if (isAnimatingRef.current) return;
          isAnimatingRef.current = true;

          isOpenRef.current = false;

          const row = rowsArrRef.current[currentRowRef.current];
          
          gsap.timeline({
            defaults: { duration: 0.5, ease: 'power4.inOut' },
            onStart: () => body.classList.remove('oh'),
            onComplete: () => {
              row.DOM.el?.classList.remove('row--current');
              row.previewItem.DOM.el?.classList.remove('preview__item--current');
              isAnimatingRef.current = false;
            }
          })
          .addLabel('start', 0)
          .to([row.DOM.images, row.previewItem.DOM.images], {
            scale: 0,
            opacity: 0,
            stagger: 0.04,
            onComplete: () => {
              if (row.DOM.imagesWrap) {
                row.DOM.images.forEach(img => {
                  row.DOM.imagesWrap?.prepend(img);
                });
              }
            }
          }, 0)
          .to(row.previewItem.DOM.title, {
            duration: 0.6,
            yPercent: 100
          }, 'start')
          .to(closeCtrl, {
            opacity: 0
          }, 'start')
          // animate cover out
          .to(cover, {
            ease: 'power4',
            height: 0,
            top: row.DOM.el && row.DOM.el.getBoundingClientRect()
              ? row.DOM.el.getBoundingClientRect()['top'] + (row.DOM.el.offsetHeight / 2)
              : 0
          }, 'start+=0.4')
          // fade out cover
          .to(cover, {
            duration: 0.3,
            opacity: 0
          }, 'start+=0.9')
          // animate all the titles in
          .to(rowsArrRef.current.map(r => r.DOM.title), {
            yPercent: 0,
            stagger: {
              each: 0.03,
              grid: 'auto',
              from: currentRowRef.current
            }
          }, 'start+=0.4');
        });
      } catch (error) {
        console.error('Error initializing portfolio:', error);
      }
    };

    initializePortfolio();
    isInitializedRef.current = true;

    // Cleanup function
    return () => {
      rowsArrRef.current.forEach(row => {
        row.DOM.el?.removeEventListener('mouseenter', () => {});
        row.DOM.el?.removeEventListener('mouseleave', () => {});
        row.DOM.el?.removeEventListener('click', () => {});
      });
      
      const closeCtrl = document.querySelector('.preview > .preview__close');
      closeCtrl?.removeEventListener('click', () => {});
    };
  }, [portfolioData]);

  return null;
};

export default PortfolioController;