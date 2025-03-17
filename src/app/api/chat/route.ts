// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { Redis } from '@upstash/redis';

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize Redis client for rate limiting
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

// Rate limiting configuration
const RATE_LIMIT_REQUESTS = 10; // requests per minute
const RATE_LIMIT_WINDOW = 60; // window size in seconds (1 minute)

// Rate limiting function
async function rateLimit(ip: string): Promise<{ success: boolean; limit: number; remaining: number }> {
  const key = `rate_limit:${ip}`;
  
  // Get current count and timestamp
  const current = await redis.get(key) as { count: number, timestamp: number } | null;
  const now = Math.floor(Date.now() / 1000);
  
  if (current === null) {
    // First request from this IP
    await redis.set(key, { count: 1, timestamp: now }, { ex: RATE_LIMIT_WINDOW });
    return { success: true, limit: RATE_LIMIT_REQUESTS, remaining: RATE_LIMIT_REQUESTS - 1 };
  }
  
  // If window has expired, reset count
  if (now - current.timestamp >= RATE_LIMIT_WINDOW) {
    await redis.set(key, { count: 1, timestamp: now }, { ex: RATE_LIMIT_WINDOW });
    return { success: true, limit: RATE_LIMIT_REQUESTS, remaining: RATE_LIMIT_REQUESTS - 1 };
  }
  
  // Check if rate limit exceeded
  if (current.count >= RATE_LIMIT_REQUESTS) {
    return { success: false, limit: RATE_LIMIT_REQUESTS, remaining: 0 };
  }
  
  // Increment count
  await redis.set(key, { count: current.count + 1, timestamp: current.timestamp }, { ex: RATE_LIMIT_WINDOW });
  return { success: true, limit: RATE_LIMIT_REQUESTS, remaining: RATE_LIMIT_REQUESTS - current.count - 1 };
}

// You can edit this profile directly in this file
// Add as much information as you want about yourself
const juliusProfile = `
Name: Julius SeJoon Park
Background: Software Engineer at ComputerTalk, specializing in full stack development. Graduated from the University of Waterloo in Engineering.

Skills:
- Languages: Python, Go, JavaScript, TypeScript, C#, C++, Haskell, Solidity
- Frontend: React.js, Next.js, Angular, HTML5, CSS3, Tailwind CSS
- Backend: Node.js, Express, .NET Core, java spring
- Database: SQL, MongoDB, PostgreSQL
- Cloud: AWS, Azure
- Other: RESTful APIs, GraphQL, Docker, Kubernetes, gRPC, SignalR

Experience:
- **ComputerTalk** (Software Engineer, July 2023 - Present)
  - Developed advanced IVR systems using Azure OpenAI, optimized for low latency with Redis caching and asynchronous .NET code.
  - Designed and scaled real-time messaging infrastructure using SignalR combined with Redis/Kafka to efficiently handle 100k+ concurrent data points, significantly improving system responsiveness and scalability.
  - Built real-time dashboards with agGrid and agCharts (Angular), delivering actionable insights for large datasets.
  - Engineered SQL query optimizations, significantly reducing query execution times through advanced indexing, caching layers, and query refactoring.
  - Collaborated with ML teams to build AI-powered chatbots leveraging Azure Bot Service and LUIS for enhanced customer interaction.

  **Project Details:**
  1. **Azure OpenAI Agentic IVR System**
     - Objective: Create a next-generation IVR system adapting conversation flows based on caller contexts.
     - Leveraged Azure OpenAI for dynamic conversational adjustments using metadata (account history, interaction patterns).
     - Integrated real-time transcription summaries to refine IVR responses.
     - Critical low latency ensured by streamlined architecture, asynchronous C# implementation (TPL), and Redis caching.

  2. **SignalR to Redis/Kafka for Real-Time Messaging**
     - Initial implementation using SignalR for immediate client-server communication.
     - Transitioned to Redis for ephemeral messages and Kafka for durable event streaming, addressing scaling limitations.
     - Improved fault tolerance, throughput, and horizontal scalability.

  3. **agGrid & agCharts for Real-Time and Historical Data (Angular)**
     - Real-time monitoring of 100k+ datasets with virtual scrolling and server-side row models.
     - Historical dashboards using agCharts for interactive analytics (zooming, filtering, grouping).
     - Angular’s two-way data binding enabled real-time UI updates.

  3. **Database Query Optimization & Caching**
     - Managed 1M+ agent statistics records with frequent ad-hoc reporting.
     - Techniques: composite index creation, execution plan optimization, CTEs, partitioned views, and caching.
     - Achieved query execution time reduction of 5+ seconds.

  4. **AI-Powered Chatbot Collaboration**
     - Built data pipelines, REST/gRPC endpoints, and automation via CI/CD.
     - Integrated Azure Bot Service and LUIS for natural language processing and real-time user data querying.
     - Enhanced efficiency and customer satisfaction through personalized AI-driven interactions.

- **OpenText** (Software Engineer Intern, September 2022 - December 2022)
  - Built modular React components integrated with Redux and GraphQL.
  - Optimized statistical data querying and delivered features ahead of schedule.

- **Arcadis IBI Group** (Project Designer Intern, January 2022 - April 2022)
  - Developed AutoCAD Civil3D plugins using .NET and ObjectARX for automating grading plans.
  - Enhanced survey data integration for streamlined workflows.

- **Economical Insurance** (Quality Assurance Intern, September 2018 - December 2018)
  - Improved PostgreSQL query performance by 30%.
  - Developed React-based test scripts for vehicle tracking.

Projects:
- **Interactive Brokers API Trading System:** Python-based trading interface for Interactive Brokers.
- **Hybrid Intraday Algo:** Combines momentum, mean reversion, and statistical arbitrage.
  - Further details:
    - Also a research effort, it was too expensive and complex with issues being consistent. While it was promising, it wasn't something maintainable.

      # Intraday Algorithmic Trading Strategy: Trend, Mean Reversion, Arbitrage & HFT

      ## Strategy Overview and Techniques

      **Intraday Multi-Technique Approach:** We propose a **hybrid intraday trading strategy** that combines trend-following (momentum), mean-reversion, and arbitrage techniques, executed at high frequency. The strategy dynamically switches or allocates capital between momentum trades (to ride short-term trends) and mean-reversion trades (to exploit pullbacks or price divergences), including **statistical arbitrage** opportunities like pairs trading. High-frequency execution is used to enter and exit positions swiftly, capturing small intraday price inefficiencies. This multi-faceted approach aims to profit in various market conditions by leveraging each technique’s strengths while mitigating their weaknesses.

      **Trend-Following (Momentum):** A trend-following component identifies and follows short-term intraday trends. For example, using moving average crossovers (e.g. a fast 20-period vs slow 50-period MA) or momentum oscillators to signal when price has established an upward or downward trajectory. Research shows that using multiple moving averages (double or triple SMA systems) can effectively capture trends, even in intraday data ([](https://wepub.org/index.php/TEBMR/article/download/4296/4839/8836#:~:text=investors%20will%20trade%20when%20the,%282%29%20Mean%20Reversion%20Strategies)). The strategy will **go long** when an uptrend is confirmed and **short** when a downtrend is confirmed, riding the momentum until the trend shows signs of reversal or weakness.

      **Mean-Reversion:** The mean-reversion component assumes that short-term price deviations will revert to a “normal” value. It looks for overbought or oversold conditions – for instance, when price strays too far from a moving average or when a **price spread** between related instruments widens excessively. The strategy might use indicators like Bollinger Bands or z-scores of price deviations to detect these extremes. In practice, this means **selling after rapid price spikes and buying after sharp drops**, under the expectation of a snap-back to the mean. This contrarian approach complements momentum: when momentum trades are not favorable (range-bound markets), mean-reversion often provides opportunities.

      **Arbitrage (Statistical Arbitrage):** The strategy incorporates a market-neutral arbitrage element, such as **pairs trading** or index arbitrage. For example, if two highly correlated stocks or a stock vs. its futures contract diverge in price, the strategy will long the underpriced asset and short the overpriced one, profiting as their prices converge. These arbitrage trades exploit relative mispricings and are typically short-term and high-frequency in nature. Notably, algorithmic statistical arbitrage has been identified as **highly profitable in intraday trading**, especially when executed at high frequencies ([](https://damoracapital.com/wp-content/uploads/2021/04/Momentum-Mean-Reversion-and-Statistical-Arbitrage-id3785503.pdf#:~:text=were%20drawn%20from%20a%20literature,While%20the%20literature%20mainly%20agrees)). By combining arbitrage with momentum and mean-reversion, the strategy can profit from both directional trends and relative value discrepancies.

      **High-Frequency Trading (HFT) Execution:** All components are implemented in an automated, high-frequency context. Orders are generated and sent to the market within milliseconds when signals arise. HFT enables the strategy to **capture small price moves and arbitrage gaps** that exist only briefly. It also means positions are typically **intraday only** – all trades are opened and closed within the trading day to avoid overnight risk. To support HFT, the strategy relies on fast data feeds, low-latency order routing, and the ability to process signals and manage risk in real-time.

      ## Risk Management Measures

      Robust **risk management** is integral to the strategy, given the rapid trading and leverage often involved in intraday HFT strategies. Key risk controls include:

      - **Stop-Loss Orders:** Every trade is accompanied by a predefined stop-loss to cap downside. For momentum trades, a stop-loss might be set just beyond a recent support/resistance or a fixed percentage (e.g. 0.5%–1%) away from entry, so that a sharp adverse move exits the position. Mean-reversion trades use stops to avoid “falling knife” scenarios – if the price doesn’t revert but keeps trending, the trade is cut. In arbitrage pair trades, a stop-loss triggers if the spread widens further than anticipated (indicating the divergence is growing). These stop-loss levels are determined based on volatility and historical price patterns to avoid being hit by normal noise ([Optimal Position Size Reduces Risk](https://www.investopedia.com/articles/trading/09/determine-position-size.asp#:~:text=appropriate%20stop%20level%20for%20a,normal%20movements%20in%20the%20market)) ([Optimal Position Size Reduces Risk](https://www.investopedia.com/articles/trading/09/determine-position-size.asp#:~:text=In%20the%20stock%20market%2C%20risking,been%20optimized%20for%20that%20risk)).

      - **Position Sizing:** The strategy uses **quantitative position sizing** rules to limit exposure per trade. A common approach is risking only a small fraction of capital (e.g. 0.5% or 1%) on any single trade. For example, if risking 1% of capital on a momentum trade, and the stop-loss is 0.5% below entry, the position size is chosen so that 0.5% move equals 1% of portfolio – this ensures consistent risk. This volatility-adjusted position sizing means larger positions in low-volatility conditions and smaller positions when volatility is high ([Optimal Position Size Reduces Risk](https://www.investopedia.com/articles/trading/09/determine-position-size.asp#:~:text=The%20first%20consideration%20should%20be,your%20account%20on%20a%20trade)) ([Optimal Position Size Reduces Risk](https://www.investopedia.com/articles/trading/09/determine-position-size.asp#:~:text=In%20the%20stock%20market%2C%20risking,been%20optimized%20for%20that%20risk)). Such **volatility-based sizing** helps normalize risk across different market regimes.

      - **Volatility-Based Adjustments:** The strategy adapts to changing market volatility. It may use indicators like Average True Range (ATR) or standard deviation of returns to scale its parameters. For instance, widening the threshold for mean-reversion entries during high volatility or reducing position size for momentum trades if intraday volatility spikes. This prevents excessive trading during erratic periods and avoids stop-losses being hit by normal volatility. Conversely, in very low volatility (when mean reversion signals might be weaker), the strategy can tighten stop-losses and reduce profit targets. These adjustments keep the strategy’s risk-return profile stable across calm and turbulent sessions.

      - **Capital Allocation and Diversification:** By design, the strategy diversifies across **multiple techniques**. At any time, part of capital may be in a trend-following trade and another in a pair trade, etc. This diversification means a loss in one strategy might be offset by a gain in another. The strategy can also enforce limits like maximum open positions or maximum total exposure to avoid over-leverage. Additionally, a **daily stop-loss limit** on the overall portfolio can be set – if losses reach a certain threshold, the system stops trading for the rest of the day to prevent runaway losses ([Optimal Position Size Reduces Risk](https://www.investopedia.com/articles/trading/09/determine-position-size.asp#:~:text=Daily%20Stop%20Levels)).

      ## Supporting Research and Model

      A well-regarded study by Velissaris (2010) provides strong support for combining these techniques into a unified strategy. In *“Diversified Statistical Arbitrage: Dynamically Combining Mean Reversion and Momentum Strategies”*, Velissaris presents a quantitative model that **blends momentum (trend-following) and mean-reversion into a single intraday arbitrage strategy** ([Diversified Statistical Arbitrage: Dynamically Combining Mean Reversion and Momentum Strategies | CoLab](https://colab.ws/articles/10.2139%2Fssrn.1666799#:~:text=This%20paper%20presents%20a%20quantitative,adjusted%20returns%20in%202008%20as)). The momentum component traded sector ETFs based on trend technical signals, while the mean-reversion component used statistical methods (principal component analysis) to isolate idiosyncratic stock movements and trade against mispricings – essentially a sophisticated pairs trading system. A dynamic portfolio optimization rebalanced between the two as market conditions evolved ([Diversified Statistical Arbitrage: Dynamically Combining Mean Reversion and Momentum Strategies | CoLab](https://colab.ws/articles/10.2139%2Fssrn.1666799#:~:text=combines%20mean%20reversion%20and%20momentum,environments%20in%202008%20and%202009)).

      **Key findings** from that research include: the combined strategy achieved **strong risk-adjusted returns in both falling and rising markets**, specifically performing well during the 2008 market crash and the 2009 rebound ([Diversified Statistical Arbitrage: Dynamically Combining Mean Reversion and Momentum Strategies | CoLab](https://colab.ws/articles/10.2139%2Fssrn.1666799#:~:text=combines%20mean%20reversion%20and%20momentum,environments%20in%202008%20and%202009)). This demonstrates the robustness of mixing momentum and mean-reversion – when markets were trending (down or up), the momentum trades paid off, and when markets whipsawed, the mean-reversion trades provided profit, with the arbitrage element keeping the overall portfolio market-neutral. The study highlights that such a hybrid approach can adapt to different regimes and reduce dependence on a single source of alpha. In practice, this model is applied by continuously analyzing market data to decide how much to allocate to each sub-strategy. An algorithm might increase weight on trend-following when a clear intraday trend is detected, or shift focus to stat-arb mean reversion when markets are choppy, all on an intraday basis.

      Another insight is that **high-frequency execution enhanced the profitability** of the arbitrage opportunities. The literature review in an algorithmic trading thesis found statistical arbitrage (which often involves mean-reversion pair trading) to be the most profitable intraday strategy, primarily because it’s implemented at high frequency and can exploit minute price discrepancies quickly ([](https://damoracapital.com/wp-content/uploads/2021/04/Momentum-Mean-Reversion-and-Statistical-Arbitrage-id3785503.pdf#:~:text=were%20drawn%20from%20a%20literature,While%20the%20literature%20mainly%20agrees)). This aligns with real-world HFT practices where algorithms engage in cross-market arbitrage and fleeting momentum ignition. The strategy we outline leverages this by using automated, rapid order placement to capture those small-edge opportunities (for example, a few cents mispricing between a stock and its future, or a quick breakout move before others react).

      **Applying the Research:** The Velissaris model inspires our strategy design. We apply momentum signals (like moving average crossovers or breakouts) to intraday data to catch trends, and simultaneously monitor a portfolio of instruments for mean-reversion trades (e.g., a basket of correlated stocks or an index future vs index ETF spread). The algorithm could use a technique like PCA or correlation analysis to identify a common trend factor and trade the residuals (market-neutral arbitrage), similar to Velissaris’s approach of separating market and idiosyncratic returns ([Diversified Statistical Arbitrage: Dynamically Combining Mean Reversion and Momentum Strategies | CoLab](https://colab.ws/articles/10.2139%2Fssrn.1666799#:~:text=decomposes%20stock%20returns%20into%20market,environments%20in%202008%20and%202009)). In simpler terms, our implementation might pick one or two highly correlated instruments (say, two tech stocks, or S&P 500 futures vs. SPY ETF) and trade the deviation of their prices from the typical relationship, while also taking directional trades if the index starts trending upward or downward strongly. The high-level idea is backed by the research: **combining strategies improves performance and stability**, and quantitative methods (like the cited PCA or optimization) help manage the combination.

      ## Python Implementation of the Strategy

      Below is a detailed Python implementation of this intraday strategy, integrating trend-following and mean-reversion (pairs arbitrage) signals with risk management. The code is heavily commented for clarity. In a production setting, you would feed in real market data (intraday price quotes for one or more instruments) – here we illustrate using synthetic data for demonstration. Key libraries used are pandas and numpy for data handling and calculations. The code is organized into steps:

      1. **Data Preparation:** Load or simulate intraday price data for the trading instruments. For example, we use df with columns for the primary instrument (e.g. a stock or index) and a second instrument for arbitrage (e.g. a correlated stock or futures contract). In practice, this data could come from a live feed or historical CSV file. We then compute technical indicators like moving averages for trend detection and the spread between instruments for mean reversion.

      2. **Indicator Calculation:** Compute the fast and slow moving averages for the trend-following signal, and the z-score of the price spread for the mean-reversion signal. The z-score tells us how many standard deviations the current spread is from its recent mean – a high absolute z-score indicates a divergence likely to revert.

      3. **Signal Generation:** Based on the indicators, generate trading signals:
        - **Momentum signal:** if fast MA > slow MA, trend is up (go long primary instrument); if fast MA < slow MA, trend is down (go short).
        - **Mean-reversion (pairs) signal:** if spread z-score > threshold (e.g. 2), the second instrument is overpriced relative to the first (short the second, long the first); if z-score < -threshold, the second is underpriced (long second, short first).

      4. **Execution Logic:** Simulate an intraday trading loop that goes through each time step (e.g. each minute or tick), checks signals, and executes trades. We maintain positions for the primary and second instruments. When a new signal arrives, the code opens a position with appropriate size (based on risk management). We also check for exit conditions: stop-loss hits or signal reversals, and close positions accordingly.

      5. **Risk Management in Code:** For each trade, we calculate a stop-loss price and position size such that the **max risk is a fixed % of capital**. For example, if capital is $100,000 and risk per trade is 1%, max loss is $1,000. If our stop is $0.50 away from entry, we trade 2,000 shares (since $0.50 * 2000 = $1,000). The code demonstrates this calculation for both momentum trades and pair trades. Volatility adjustments can also be applied (e.g., use a larger stop or smaller position if recent volatility is high – in code we could incorporate the vol_base measure to scale down risk_amount in turbulent periods).

      6. **Logging and Output:** The code logs each trade action (entry, exit, stop hit) with timestamp and details. In production, instead of printing, you might send orders to a broker API and maintain an internal log or database. Here we simply show how one would record the actions. 

      Please note that actual deployment for HFT would require an event-driven system (listening to market ticks) and ultra-fast execution – the structure below is a **simplified, educational version**. It’s suitable for backtesting or moderate-frequency trading. For true HFT, one would optimize the code (possibly using vectorized operations in pandas, C++ extensions, or specialized trading platforms). Still, the core logic and risk controls would remain as implemented.

      python
      import numpy as np
      import pandas as pd

      # -----------------------------
      # 1. Data Preparation (Load or simulate intraday data)
      # -----------------------------
      # In production, replace this simulation with real data loading (from CSV, API, etc.)
      # For example:
      # df = pd.read_csv('intraday_data.csv', parse_dates=True, index_col='timestamp')
      # Ensure df has columns like 'Price1' (primary instrument) and 'Price2' (secondary instrument for pairs).

      # Simulate synthetic intraday price series for demonstration
      np.random.seed(42)
      n_points = 1000  # number of intraday data points (e.g., ticks or minutes)
      # Simulate a primary instrument price (with a slight upward drift and random noise)
      price1 = [100.0]
      for t in range(1, n_points):
          drift = 0.01  # small upward drift per step
          noise = np.random.normal(0, 0.5)  # random noise
          price1.append(price1[-1] + drift + noise)
      price1 = np.array(price1)
      # Simulate a secondary instrument price that is correlated with primary but has mean-reverting spread
      price2 = []
      spread = 0.0
      for t in range(n_points):
          # secondary price = primary price + a spread
          # spread follows a mean-reverting process around 0
          spread = 0.9 * spread + np.random.normal(0, 0.2)  # Ornstein-Uhlenbeck style
          price2.append(price1[t] + spread)
      price2 = np.array(price2)

      # Create DataFrame for prices
      df = pd.DataFrame({'Price1': price1, 'Price2': price2})

      # -----------------------------
      # 2. Indicator Calculation
      # -----------------------------
      # Compute moving averages for momentum detection on Price1
      df['MA_fast'] = df['Price1'].rolling(window=20).mean()    # fast MA (e.g., 20-period)
      df['MA_slow'] = df['Price1'].rolling(window=50).mean()    # slow MA (e.g., 50-period)
      # To avoid NaNs in the beginning, fill them forward
      df[['MA_fast','MA_slow']] = df[['MA_fast','MA_slow']].fillna(method='bfill')

      # Compute spread and its z-score for mean-reversion between Price1 and Price2
      df['Spread'] = df['Price2'] - df['Price1']
      spread_mean = df['Spread'].rolling(window=50).mean()
      spread_std  = df['Spread'].rolling(window=50).std()
      # Fill initial NaNs
      spread_mean = spread_mean.fillna(method='bfill')
      spread_std = spread_std.fillna(method='bfill')
      df['Spread_Z'] = (df['Spread'] - spread_mean) / (spread_std + 1e-8)  # z-score of spread

      # Compute a simple volatility measure (rolling std of returns) for position sizing adjustments
      df['Ret1'] = df['Price1'].pct_change().fillna(0)
      df['Vol1'] = df['Ret1'].rolling(window=20).std().fillna(method='bfill')
      # (In practice, could use ATR for volatility – here we use return std as a proxy)

      # -----------------------------
      # 3. Parameters and thresholds
      # -----------------------------
      # Define strategy parameters and risk management settings
      capital = 100000.0           # starting capital
      risk_per_trade = 0.01        # risk 1% of capital per trade
      spread_threshold = 2.0       # z-score threshold to trigger a pairs trade
      momentum_stop_pct = 0.01     # 1% stop-loss for momentum trades (adjustable based on volatility)

      # Initialize variables for holding current positions and orders
      position1 = 0    # position for Price1 (positive = long, negative = short)
      position2 = 0    # position for Price2 (for pair trades, positive = long, negative = short)
      entry_price1 = 0.0
      entry_spread = 0.0
      stop_price1 = 0.0
      stop_spread = 0.0
      pair_trade_active = False

      # List to log trade actions (for verification or analysis)
      trade_log = []

      # -----------------------------
      # 4. Signal Generation & Execution Loop
      # -----------------------------
      for t in range(len(df)):
          # Get the latest indicator values
          price1_t = df.at[t, 'Price1']
          fast_ma  = df.at[t, 'MA_fast']
          slow_ma  = df.at[t, 'MA_slow']
          spread_z = df.at[t, 'Spread_Z']
          current_spread = df.at[t, 'Spread']
          current_vol = df.at[t, 'Vol1']
          
          # --- Momentum Trend-Following Signals for Price1 ---
          if position1 == 0 and not pair_trade_active:
              # If no open position on Price1 (and no pair trade tying up Price1), look for momentum entry
              if fast_ma > slow_ma:
                  # Bullish trend signal – open long on Price1
                  entry_price1 = price1_t
                  # Stop-loss at X% below entry (volatility could adjust this; here fixed 1%)
                  stop_price1 = entry_price1 * (1 - momentum_stop_pct)
                  # Position sizing: risk a fixed % of capital
                  risk_amount = risk_per_trade * capital  # e.g., $1,000 if 1% of $100k
                  stop_distance = entry_price1 - stop_price1
                  shares = risk_amount / stop_distance if stop_distance > 0 else risk_amount
                  shares = int(shares)
                  position1 = shares  # long position
                  trade_log.append((t, "Buy Price1 (Momentum)", shares, price1_t))
              elif fast_ma < slow_ma:
                  # Bearish trend signal – open short on Price1
                  entry_price1 = price1_t
                  stop_price1 = entry_price1 * (1 + momentum_stop_pct)
                  risk_amount = risk_per_trade * capital
                  stop_distance = stop_price1 - entry_price1
                  shares = risk_amount / stop_distance if stop_distance > 0 else risk_amount
                  shares = int(shares)
                  position1 = -shares  # short position
                  trade_log.append((t, "Sell Price1 (Momentum)", shares, price1_t))
          elif position1 != 0:
              # If a momentum position is open, check for exit conditions
              if position1 > 0:
                  # Long position: check stop-loss or trend reversal
                  if price1_t < stop_price1:
                      # Price fell below stop – exit long
                      trade_log.append((t, "Exit Price1 Long (Stop Hit)", position1, price1_t))
                      position1 = 0
                  elif fast_ma < slow_ma:
                      # Trend reversed to bearish – take profit and exit long
                      trade_log.append((t, "Exit Price1 Long (Trend Reversed)", position1, price1_t))
                      position1 = 0
              elif position1 < 0:
                  # Short position: check stop-loss or trend reversal
                  if price1_t > stop_price1:
                      # Price rose above stop – exit short
                      trade_log.append((t, "Exit Price1 Short (Stop Hit)", position1, price1_t))
                      position1 = 0
                  elif fast_ma > slow_ma:
                      # Trend reversed to bullish – exit short
                      trade_log.append((t, "Exit Price1 Short (Trend Reversed)", position1, price1_t))
                      position1 = 0

          # --- Mean-Reversion Pairs Trading Signals for Price1 & Price2 ---
          if not pair_trade_active:
              # If no pair trade is active, look for spread extremes
              if spread_z > spread_threshold:
                  # Price2 is significantly overpriced relative to Price1
                  # Strategy: short Price2, long Price1 to bet on convergence
                  entry_spread = current_spread
                  # Set a stop if spread widens further by some amount (e.g., half an std dev)
                  stop_spread = entry_spread + (spread_std.iloc[t] * 0.5 if not np.isnan(spread_std.iloc[t]) else 0.5)
                  # Position sizing for pair trade – risk 1% of capital on spread movement
                  risk_amount = risk_per_trade * capital
                  # Estimate potential loss per share if spread goes to stop level
                  est_loss_per_share = (stop_spread - entry_spread)
                  if est_loss_per_share <= 0: 
                      est_loss_per_share = 0.5  # fallback to 0.5 as an assumed adverse move
                  shares = int(risk_amount / est_loss_per_share)
                  # Open positions: long Price1 shares, short Price2 shares
                  position1 += shares
                  position2 -= shares
                  pair_trade_active = True
                  trade_log.append((t, "Long Price1 & Short Price2 (Pairs)", shares, current_spread))
              elif spread_z < -spread_threshold:
                  # Price2 is significantly underpriced relative to Price1
                  # Strategy: long Price2, short Price1
                  entry_spread = current_spread
                  stop_spread = entry_spread - (spread_std.iloc[t] * 0.5 if not np.isnan(spread_std.iloc[t]) else 0.5)
                  risk_amount = risk_per_trade * capital
                  est_loss_per_share = (entry_spread - stop_spread)
                  if est_loss_per_share <= 0:
                      est_loss_per_share = 0.5
                  shares = int(risk_amount / est_loss_per_share)
                  # Open positions: short Price1, long Price2
                  position1 -= shares
                  position2 += shares
                  pair_trade_active = True
                  trade_log.append((t, "Short Price1 & Long Price2 (Pairs)", shares, current_spread))
          else:
              # If a pair trade is active, monitor for exit or stop conditions
              # Mean reversion achieved: if spread z-score reverted near 0, close the trade
              if abs(spread_z) < 1.0:  # threshold to consider spread "normalized"
                  # Close both legs of the pair trade
                  if position1 > 0 and position2 < 0:
                      # We were long Price1 and short Price2
                      trade_log.append((t, "Exit Pairs Trade (Price1 long, Price2 short)", position1, current_spread))
                  elif position1 < 0 and position2 > 0:
                      trade_log.append((t, "Exit Pairs Trade (Price1 short, Price2 long)", position2, current_spread))
                  # Flatten pair positions
                  position1 = 0
                  position2 = 0
                  pair_trade_active = False
              else:
                  # Check stop-loss on the spread
                  if position2 < 0 and current_spread > stop_spread:
                      # We are short Price2 & long Price1, and spread widened beyond stop
                      trade_log.append((t, "Stop Pairs Trade (Spread widened)", current_spread, stop_spread))
                      # Exit both positions
                      position1 = 0
                      position2 = 0
                      pair_trade_active = False
                  elif position2 > 0 and current_spread < stop_spread:
                      # We are long Price2 & short Price1, and spread went below stop (too negative)
                      trade_log.append((t, "Stop Pairs Trade (Spread collapsed)", current_spread, stop_spread))
                      position1 = 0
                      position2 = 0
                      pair_trade_active = False

      # End of trading loop

      # -----------------------------
      # 5. Example Output: Trade Log
      # -----------------------------
      # Print out the log of trades for inspection (in production, this might be saved to file or database)
      for entry in trade_log[:10]:  # printing only first 10 log entries as example
          print(entry)
      

      **Explanation of the Code:** We start by setting up our data. In a real scenario, you would load intraday price data for your target instruments (e.g., a stock and its futures contract, or two correlated stocks). We then calculate a 20-period and 50-period moving average on the primary instrument (Price1) to detect trends – if the 20 crosses above the 50, that’s a bullish momentum signal, and if it crosses below, that’s bearish. We also compute the price spread between Price2 and Price1 along with its rolling mean and standard deviation, to standardize it into a z-score (Spread_Z). When Spread_Z exceeds +2 or -2, it indicates a rare divergence (beyond 2 standard deviations).

      The main loop iterates through each time index (each “bar” of intraday data). It checks conditions in sequence:

      - **Momentum trading block:** If we’re not already in a momentum trade (position1 == 0 and no active pair trade using Price1), we look for a crossover signal. On a buy signal, we calculate the position size (shares) such that if our stop-loss (1% below entry) is hit, the loss is ~1% of capital. We open the long position (position1 = shares). Similarly, for a short signal, we set a stop 1% above entry and size the short position. If we already have a momentum position open, we continuously check for exit: either the price hitting the stop-loss level or the moving averages crossing in the opposite direction (trend reversal). When an exit condition triggers, we set position1 back to 0 (flat) and log the exit.

      - **Pairs trading block:** If no pair trade is active, we check the spread z-score. A spread_z > 2 means Price2 is relatively expensive vs Price1, so we short Price2 and long Price1. We set a stop for the spread (e.g., if it widens another half std dev) and size the trade so that this worst-case spread move would cost 1% of capital. We update position1 and position2 accordingly and mark pair_trade_active = True. (Note: we adjust the same position1 variable, meaning if we had a momentum position on Price1, this code would aggregate with it – in practice you might manage them separately, but net exposure is what matters for execution). Likewise, if spread_z < -2, we long Price2 and short Price1. If a pair trade is already active, we watch for mean reversion (|z| < 1) to take profit and close both legs, or if the spread moves further against us to trigger the stop, we also close both legs.

      The **trade log** will record entries and exits. For instance, you might see a log entry like (38, "Long Price1 & Short Price2 (Pairs)", 2000, 0.75) meaning at time index 38, the strategy opened a pairs trade with 2000 shares (long Price1, short Price2) when the spread was $0.75 (Price2 was $0.75 above Price1). Later an exit might be logged when that spread returns near 0 or a stop if it went the wrong way. The momentum trades will have similar logs with “Buy” or “Sell” and “Exit” when closed.

      This implementation is a basic deterministic strategy. In production, you would integrate this with real-time data input and order execution API calls. The core ideas demonstrated are: **how to generate signals from data, how to size positions safely, and how to enforce exits**. The use of pandas makes it convenient to compute indicators; in a live system, you might maintain rolling calculations to update these on the fly rather than recalculating on each loop iteration for efficiency.

      ## Usage and Adaptation Guide

      **Using the Strategy:** To use this strategy on real markets, you should calibrate it to the specific instrument(s) and intraday timeframe you’re trading. Feed in live data for the assets of interest (for example, 1-minute OHLC data for an equities pair or an index future and its index ETF). The code can be adapted into a real-time event loop: on each new tick or bar, update the moving averages and spread z-score, then execute the logic to send buy/sell orders via your broker’s API. Ensure you also implement the trade logging and tracking of positions in your trading engine. It’s crucial to thoroughly **backtest** the strategy on historical intraday data to verify its performance and to fine-tune parameters (like the MA lengths, z-score thresholds, stop-loss percentages, etc.) for your particular market.

      **Adapting to Different Market Conditions:**

      - *Trending vs. Ranging Markets:* In strongly trending markets (e.g., a steady rally or sell-off during the day), the momentum component will dominate. You might consider increasing the position size for momentum trades or loosening the stop (to ride the trend longer) during such conditions. Conversely, in choppy or range-bound intraday sessions, the mean-reversion pair trades will likely generate more signals and profit opportunities. In those times, you could reduce the threshold to enter mean-reversion trades (e.g., use z-score 1.5 instead of 2) to capitalize on smaller deviations, and perhaps tighten the momentum signals to avoid false trends (e.g., require two bars confirmation of MA crossover).

      - *Volatility Regimes:* Adjust the strategy’s sensitivity based on volatility. Our code uses a fixed 1% stop for momentum and a fixed z-score threshold. In a high-volatility environment (say around major news or high VIX days), prices swing more, so you might **widen stop-losses** (to, say, 2% for momentum) and increase the z-score threshold (maybe 2.5 or 3) to avoid getting whipsawed by noise. Position sizing will automatically reduce since the stop distance is larger (risk per trade is constant %). In low-volatility conditions, you can tighten stops and thresholds to capture smaller moves. Also consider using an ATR-based stop: e.g., stop at 2 * ATR(10) for the instrument, and size the trade accordingly – this directly ties the stop to recent volatility.

      - *Different Instruments:* The strategy logic remains similar for stocks, futures, or forex, but parameters will change. Futures, for instance, often have nearly 24-hour sessions – you might run the strategy during the most liquid hours. If applying to forex pairs, the mean-reversion could be on two currency pairs that historically correlate, or even the same pair after news spikes. Always account for each market’s characteristics: **transaction costs and slippage** are critical at high frequency. If trading futures, ensure the tick size and exchange fees are factored in – you might require a larger edge (e.g., wait for z-score 2.5) to overcome costs. For stocks, ensure liquidity is sufficient for your position size to avoid market impact.

      - *Risk Management Customization:* We used a simple 1% per trade risk. You can adjust this up or down based on your risk appetite and the number of concurrent trades. If running multiple strategies (momentum and arbitrage) together, consider an overall portfolio risk limit (for example, if both strategies signal at once, make sure the total exposure is still within tolerances). Implement **fail-safes**: e.g., if network or system issues prevent your algorithm from trading, have safety stops or alerts in place.

      **Performance Monitoring:** Continuously monitor the strategy’s performance and market behavior. If you notice that trends are faltering (many false breakouts) but mean reversion is working, you might allocate less capital to momentum trades temporarily. The algorithm can be extended to do this adaptively: e.g., track the win rate of momentum signals vs. mean-reversion signals in real-time and dynamically weight the strategy. Modern approaches might even use machine learning to decide which regime the market is in. However, even without ML, straightforward checks and parameter tweaks can go a long way in different conditions.

      **Conclusion:** This intraday algorithmic strategy, grounded in both academic research and industry practice, illustrates how combining trend-following and mean-reverting arbitrage can create a robust trading system. By carefully managing risk through stops, position sizing, and volatility adjustments, the strategy is equipped to handle the fast pace of intraday markets. As always, thorough testing and incremental deployment (e.g., start with small position sizes in live trading) are recommended before scaling up. With proper calibration, this multi-technique approach can systematically capitalize on intraday price movements while controlling downside risk, much like the successful models reported in the literature ([Diversified Statistical Arbitrage: Dynamically Combining Mean Reversion and Momentum Strategies | CoLab](https://colab.ws/articles/10.2139%2Fssrn.1666799#:~:text=combines%20mean%20reversion%20and%20momentum,environments%20in%202008%20and%202009)) ([](https://damoracapital.com/wp-content/uploads/2021/04/Momentum-Mean-Reversion-and-Statistical-Arbitrage-id3785503.pdf#:~:text=were%20drawn%20from%20a%20literature,While%20the%20literature%20mainly%20agrees)).

- **Low Latency Trading System Configuration:** Infrastructure design for ultra-low-latency trading.
  - Further details:
    - Hypothetical low-latency algorithmic trading setup:

        ---

        ### Hardware & Network Infrastructure

        1. **Co-location & Network Setup:**
          - **Data Center:** Rent a rack in an exchange-approved colocation facility (e.g., Equinix or a specific exchange data center) so that you’re physically close to the market data servers.
          - **Dedicated Connectivity:** Contract a dedicated fiber-optic connection or direct market data feed. For example, using a dark fiber lease or an exchange’s direct connectivity service minimizes hops and reduces jitter.
          - **Low-Latency NICs:** Install network interface cards that support kernel bypass (like Solarflare or Mellanox cards with RDMA support). These cards can shave microseconds off the packet processing time.

        2. **Bare-Metal Server Specifications:**
          - **CPU:** Choose a server with high clock speeds and low-latency cores. For example, an Intel Xeon Gold or Platinum series processor with a high base clock rate and support for Turbo Boost can be ideal.
          - **Memory:** At least 64 GB of high-speed ECC RAM (upgradeable to 128 GB if your strategy processes large volumes of data concurrently). ECC memory ensures reliability in a continuous trading environment.
          - **Storage:** NVMe SSDs for rapid data logging and local cache. Although most trading algorithms operate primarily in memory, fast storage is important for logging and audit trails.
          - **PCIe & Expansion:** A server chassis that supports multiple PCIe slots for network cards or even FPGA accelerator cards if you plan to offload critical tasks.
          - **Example:** A server build might include dual-socket Xeon processors, 64–128 GB of DDR4 RAM, dual NVMe drives in RAID 0 (for speed), and 10GbE or 25GbE network cards.

        ---

        ### Software Architecture & Optimization

        1. **Operating System & Kernel:**
          - **OS:** Use a Linux distribution such as Ubuntu or CentOS tailored for performance.
          - **Low-Latency Kernel:** Install a low-latency or real-time kernel variant to reduce interrupt latencies.
          - **System Tuning:** Configure CPU affinity for trading processes, disable power-saving modes, and tweak TCP settings (e.g., adjusting buffer sizes and disabling Nagle’s algorithm) for optimal performance.

        2. **Application & Code Optimization:**
          - **Python Environment:**
            - **Async Programming:** Use Python’s asyncio for non-blocking I/O operations to handle real-time market data.
            - **C/C++ Extensions:** Identify performance-critical code segments and rewrite them in C/C++ using Python extensions, Cython, or Numba.
            - **Profiling:** Continuously profile your system (e.g., using cProfile) to identify and optimize bottlenecks.
          - **Microservices:** Consider breaking your trading system into microservices. For instance:
            - **Market Data Service:** A service dedicated to collecting and pre-processing real-time market data.
            - **Signal Processing & Strategy Execution:** A service to run your trading algorithms, potentially using compiled extensions for heavy computation.
            - **Order Execution Module:** A service that handles order routing and risk checks with direct access to the exchange APIs.

        3. **Supplementary Tools:**
          - **Monitoring:** Implement real-time monitoring using tools like Prometheus and Grafana to visualize latency metrics, CPU usage, and network performance.
          - **Redundancy & Failover:** Set up a secondary server (ideally in the same co-location environment) configured to take over in case of primary system failures.

        ---

        ### Example Realistic Setup Diagram

        
                    ┌──────────────────────────────┐
                    │   Exchange Data Center       │
                    │                              │
                    │  [Market Data Feeds]         │
                    └─────────────▲───────────────┘
                                  │
                    ┌──────────────┼───────────────┐
                    │ Co-Located Bare-Metal Server │
                    │ ────────────────────────────  │
                    │ • Dual Xeon CPUs             │
                    │ • 64-128 GB ECC Memory       │
                    │ • NVMe SSD Storage           │
                    │ • Low-latency NIC (10/25GbE)   │
                    │ • FPGA Card (optional)       │
                    └──────────────┬───────────────┘
                                  │
                    ┌──────────────┼───────────────┐
                    │ Python-Based Trading Engine  │
                    │ • asyncio for event handling │
                    │ • C/C++ extensions for speed │
                    │ • Low-latency OS tuning       │
                    └──────────────┬───────────────┘
                                  │
                      ┌────────────┼────────────┐
                      │   Direct Order Routing   │
                      │   to the Exchange        │
                      └──────────────────────────┘
        

        ---

        ### Summary

        - **Hardware:** Use a co-located, bare-metal server with high-frequency CPUs (e.g., Intel Xeon Gold/Platinum), 64–128 GB ECC memory, NVMe storage, and low-latency NICs. Optionally include FPGA accelerators for ultra-critical tasks.
        - **Software:** Leverage a low-latency Linux kernel, optimize your Python code with async programming and compiled extensions, and break your system into focused microservices.
        - **Network:** Ensure dedicated, high-speed fiber connectivity directly to the exchange and use low-latency network equipment.
        - **Monitoring & Failover:** Implement robust latency monitoring and maintain redundancy with failover servers.

        This setup is tailored to strike a balance between ultra-low latency and robust, scalable infrastructure for algorithmic trading using Python. Each element—from physical hardware to code optimizations—works together to shave off microseconds, which can be critical in high-frequency trading environments.

- **Seam (Receipt Splitter App)**: Mobile app using React Native, Python FastAPI backend, OCR, and voice processing.
  - Further details:
    - We are now using Whisper AI for transcription and OpenAI GPT-4o-mini for categorization, along with PostgreSQL.

      1. High-Level Architecture Overview
      We are optimizing Seam for the fastest possible bill splitting. The focus is on real-time OCR/AI processing, minimizing user input, and ensuring quick calculations.

      Tech Stack:
      Layer	Technology
      Frontend	React Native (Expo)
      Backend	FastAPI (Python) or Node.js (Express)
      Database	PostgreSQL (with Prisma or SQLAlchemy ORM)
      OCR Processing	Google Cloud Vision API
      Speech-to-Text	Whisper AI (local or API)
      AI Categorization	OpenAI GPT-4o-mini
      Real-time Sync	WebSockets (for multi-user collaboration)
      Authentication	OAuth (Google, Apple) + PostgreSQL
      Payments	Stripe, Venmo, PayPal API
      Storage	S3 (for receipt images)
      Deployment & DevOps	AWS (EC2, RDS, Lambda) / DigitalOcean
      2. Database Schema (PostgreSQL)
      Using PostgreSQL allows structured relational data storage, fast queries, and better transaction handling.

      Schema Design
      Users Table
      sql
      Copy
      Edit
      CREATE TABLE users (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          profile_photo TEXT,
          balance DECIMAL(10,2) DEFAULT 0,
          created_at TIMESTAMP DEFAULT NOW()
      );
      Bills Table
      sql
      Copy
      Edit
      CREATE TABLE bills (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          title VARCHAR(255) NOT NULL,
          creator_id UUID REFERENCES users(id),
          total_amount DECIMAL(10,2) NOT NULL,
          currency VARCHAR(10) DEFAULT 'USD',
          location VARCHAR(255),
          date TIMESTAMP DEFAULT NOW(),
          status VARCHAR(20) DEFAULT 'open'
      );
      Bill Items Table
      sql
      Copy
      Edit
      CREATE TABLE bill_items (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          bill_id UUID REFERENCES bills(id) ON DELETE CASCADE,
          item_name VARCHAR(255),
          price DECIMAL(10,2) NOT NULL,
          assigned_to UUID[] DEFAULT '{}'
      );
      Payments Table
      sql
      Copy
      Edit
      CREATE TABLE payments (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          bill_id UUID REFERENCES bills(id) ON DELETE CASCADE,
          payer_id UUID REFERENCES users(id),
          recipient_id UUID REFERENCES users(id),
          amount DECIMAL(10,2) NOT NULL,
          status VARCHAR(20) DEFAULT 'pending',
          created_at TIMESTAMP DEFAULT NOW()
      );
      3. Backend API Design
      We will use FastAPI (Python) or Express.js (Node.js) for a highly optimized backend.

      Endpoints
      1. Transcribe Voice Input
      POST /transcribe
      Input: { audio_url: "https://..." }
      Process:
      Use Whisper AI to convert voice to text.
      Feed text into GPT-4o-mini to categorize expenses.
      Output:
      json
      Copy
      Edit
      {
          "total": 20.00,
          "split": [
              {"user": "A", "amount": 5.00},
              {"user": "B", "amount": 5.00}
          ]
      }
      2. Process Receipt via OCR
      POST /process-receipt
      Input: { image_url: "https://..." }
      Process:
      Use Google Cloud Vision API for OCR.
      GPT-4o-mini refines the data.
      Output: List of detected items.
      3. Create a Bill
      POST /create-bill
      Input: Bill details + users.
      Process: Store in PostgreSQL.
      Output: { bill_id: "abc123" }
      4. Assign Items to Users
      POST /assign-items
      Input: { bill_id: "abc123", items: [{ item_id: "xyz", user_id: "A" }] }
      Output: { success: true }
      5. Real-time Bill Sync
      WebSocket /subscribe/{billId}
      Users get updates in real-time.
      6. Payment Integration
      POST /pay
      Input: { payer_id, recipient_id, amount, method: "Venmo" }
      Output: Transaction confirmation.
      4. Frontend UI/UX
      Screens
      1. Home (Dashboard)
      Displays balances, bills, groups.
      Quick navigation buttons for manual & auto mode.
      2. Bill Splitting (Manual Mode)
      Step 1: Upload receipt.
      Step 2: OCR extracts items.
      Step 3: Users tap items they ate.
      Step 4: Real-time split calculation.
      Step 5: Payment options.
      3. Auto Mode (Voice)
      Users record speech → AI processes split → Confirm.
      4. Payment Settlement
      View pending payments.
      Integrate with Venmo, PayPal, Stripe.
      5. Group Management
      Persistent groups for roommates, frequent diners.
      Transaction history per group.
      5. Optimization & Real-time Sync
      PostgreSQL Indexing: Optimize queries for split calculations.
      WebSockets: Enable real-time editing of bills.
      AI Caching: Store preprocessed OCR results.
      Parallel Processing: Split transcription + AI logic across multiple cores.
      6. Security Considerations
      OAuth Authentication (Google, Apple)
      Secure Payment Handling (Stripe, Plaid)
      Rate Limits for OCR & AI processing
      7. Deployment & DevOps
      Component	Technology
      Backend	Dockerized FastAPI/Node.js on AWS
      Database	PostgreSQL (Amazon RDS)
      File Storage	S3 for receipts
      CI/CD	GitHub Actions
      Monitoring	Prometheus + Grafana
      Final Thoughts
      We’ve optimized Seam for fastest bill-splitting possible by:

      Using Whisper AI for speech-to-text.
      Using GPT-4o-mini to extract + categorize expenses.
      Switching to PostgreSQL for robust structured data.
      Real-time sync via WebSockets.
      Fast payment integrations.

- **Oil Futures Trading Research Framework:** Strategy development and rigorous backtesting.
  - Further details:
    -This was done as a research effort, with hours of backtesting. Part of a collaborative study. 

        # Oil Futures Trading Strategy Research

        ## Introduction and Key Objectives  
        Crude oil futures are influenced by a complex interplay of fundamental and financial factors. Key goals of this research include identifying the drivers of oil futures prices, developing trading strategies using both traditional technical analysis and statistical methods, and rigorously testing these strategies under realistic conditions. We aim to prioritize publicly available data sources (e.g., government and academic datasets) and establish clear risk constraints and performance benchmarks. By the end of this study, we expect to highlight promising strategies with favorable risk-adjusted returns and provide recommendations for implementation.

        ### Key Factors Influencing Oil Futures Prices  
        Understanding what moves oil prices is essential. Crude oil prices react to many variables, notably supply and demand fundamentals and the perceived risk of market disruptions ([Top Factors That Affect the Price of Oil](https://www.investopedia.com/articles/investing/072515/top-factors-reports-affect-price-oil.asp#:~:text=,to%20lower%20demand%20and%20prices)). For instance, strong economic growth boosts oil demand, whereas slowdowns reduce it. Oil supply is often managed by OPEC’s production quotas, making OPEC decisions a major price driver. Because both supply and demand are relatively inelastic in the short run (slow to respond to price changes), even small imbalances can cause large price swings. Other influential factors include:  

        - **Geopolitical Events**: Conflicts or political decisions can threaten supply (e.g., sanctions, wars), spiking prices due to scarcity fears.  
        - **Inventory Levels**: Crude oil inventories (such as those reported by the EIA weekly) provide insight into short-term supply-demand balance; low inventories can signal tighter supply, supporting higher prices.  
        - **Market Speculation**: Financial investors (hedge funds, ETFs) also impact futures. High trading volumes and open interest reflect speculative activity which can amplify volatility. For example, money managers often hold net long positions in oil futures, which can push prices higher during bullish sentiment.  
        - **Macroeconomic Factors**: Currency exchange rates (a stronger USD can pressure oil prices since oil is dollar-priced), interest rates, and global economic indicators (GDP growth, industrial production) correlate with oil demand. In particular, oil prices and economic growth influence each other cyclically.  

        By researching academic literature and industry reports, we will catalog these factors and potentially quantify their influence on oil futures price movements. For example, a study using a GARCH-MIDAS model found that both low-frequency factors (like production, consumption, inventories) and high-frequency factors (trading volume, spot prices) significantly explain oil price volatility. These insights will guide which features or indicators we incorporate into our strategies.

        ### Data Sources and Collection  
        Reliable data is the backbone of strategy development. We will gather historical oil price data and related indicators from reputable, publicly available sources:  

        - **Official Agencies**: The U.S. Energy Information Administration (EIA) and International Energy Agency (IEA) publish free data on oil prices, production, inventories, and market reports. For example, the EIA provides daily and weekly prices for WTI and Brent crude ([Cushing, OK WTI Spot Price FOB (Dollars per Barrel) - EIA](https://www.eia.gov/dnav/pet/hist/rwtcm.htm#:~:text=Cushing%2C%20OK%20WTI%20Spot%20Price,Crude%20Oil%20and%20Petroleum%20Products)), as well as reports like the *Commitment of Traders* for futures positioning.  
        - **Futures Exchange Data**: Price and volume data can be obtained from exchanges (CME for WTI, ICE for Brent). CME’s historical data (settlements, volume, open interest) can often be accessed via data vendors or CME’s own data services ([Crude Oil Futures Settlements - CME Group](https://www.cmegroup.com/markets/energy/crude-oil/light-sweet-crude.settlements.html#:~:text=Crude%20Oil%20Futures%20Settlements%20,View%20Overview)).  
        - **Open Financial Datasets**: Platforms like Yahoo Finance and Quandl/FRED offer historical time series for crude oil. For example, Yahoo Finance provides continuous front-month WTI futures prices, and FRED offers WTI Cushing spot prices ([Crude Oil Prices: West Texas Intermediate (WTI) - Cushing, Oklahoma](https://fred.stlouisfed.org/series/DCOILWTICO#:~:text=Crude%20Oil%20Prices%3A%20West%20Texas,a%20benchmark%20in%20oil%20pricing)). Kaggle also hosts datasets, such as daily WTI prices spanning multiple decades ([Daily Crude Price Dataset - Kaggle](https://www.kaggle.com/datasets/tarique7/daily-crude-price-dataset#:~:text=Daily%20Crude%20Price%20Dataset%20,in%20USD%20for%20each%20day)).  
        - **Academic Data Repositories**: Some academic studies provide datasets or references to where data was obtained (e.g., Bloomberg, Thomson Reuters). Where accessible, we will leverage any shared data for reproducibility.  

        **Data Collection Approach**: We will use Python to programmatically fetch or load these datasets. Below is a sample snippet using Python’s pandas library to load a time series of oil prices from a CSV file (assuming such a file has been downloaded from an official source or dataset): 

        python
        import pandas as pd

        # Load historical WTI prices (date, price) from a CSV file
        df = pd.read_csv("wti_prices.csv", parse_dates=["Date"], index_col="Date")
        print(df.head())
          

        This would print the first few entries of the dataset and confirm the data format. By collecting data from multiple sources, we can cross-verify consistency (for example, comparing EIA’s WTI price with Yahoo’s) to ensure reliability.

        ### Data Cleaning and Preprocessing  
        Oil futures data often has quirks that require cleaning: missing values (especially around holidays or contract roll dates), outliers from bad ticks or extreme events, and structural breaks (like the negative WTI price in April 2020). Our preprocessing steps will include:  

        - **Handling Missing Data**: Fill or interpolate missing prices carefully. For instance, if using daily data, weekends/holidays will be missing; we may forward-fill the last price for continuity or simply not include non-trading days in analysis. Any truly missing observation in trading days can be filled from alternate sources or using interpolation if minor.  
        - **Outlier Removal/Adjustment**: Identify outliers beyond a reasonable threshold (e.g., using z-scores or percentile capping). Sudden extreme values can be checked against news events; if an outlier is due to a data error, we may correct or remove it. For example, an erroneous price spike might be replaced with the average of the surrounding prices. However, genuine market extremes (like the -\$37 WTI price) should remain in the dataset, as they represent real market behavior, but treated with care in model training (perhaps winsorizing extreme values when fitting certain models).  
        - **Feature Engineering**: Create features that could improve strategy signals. Some ideas: moving averages of price (to gauge trend), price momentum (rate of change), volatility estimates (e.g., rolling standard deviation or GARCH-based volatility), and even macro features like the USD index or stock index levels if relevant. We might also derive **seasonal features** (oil often shows seasonal patterns, like price strength in summer driving season or winter heating demand). For statistical models, computing log returns is useful to stabilize variance.  

        For example, using pandas we can add technical indicators easily: 

        python
        # Calculate 20-day and 50-day moving averages
        df["MA_20"] = df["Price"].rolling(window=20).mean()
        df["MA_50"] = df["Price"].rolling(window=50).mean()
        # Calculate a momentum indicator: 14-day Rate of Change (ROC)
        df["ROC_14"] = df["Price"].pct_change(periods=14) * 100  # percentage change over 14 days
          

        This code adds two moving averages and a 14-day momentum (%) to our DataFrame. These features will be used by various strategies (e.g., moving average crossover signals or momentum threshold signals). All data processing steps will be carefully documented to ensure reproducibility.

        ### Trading Strategy Development  
        We will explore a range of trading strategies, roughly categorized into **technical strategies** (rules based on price patterns/indicators) and **statistical strategies** (models and data-driven approaches). Each strategy will be formulated and then backtested on historical data.

        **1. Technical Trading Strategies:**  
          - **Moving Averages and Trend Following**: A classic approach is the Moving Average Crossover strategy. For example, a strategy might go long (buy) when a short-term MA (say 50-day) crosses above a long-term MA (200-day), indicating an uptrend, and go short or exit when the crossover reverses. This captures momentum and trend continuation. The moving average strategy is popular for its simplicity and has been applied to oil markets to catch major trend movements.  
          - **Momentum and Oscillators**: We will test momentum indicators like Rate of Change (ROC) and Relative Strength Index (RSI). A recent study found that a 14-month ROC indicator, in combination with price-moving-average crossover rules, outperformed a buy-and-hold in WTI futures, achieving significantly higher returns (including a 295% gain in 2009) and higher Sharpe/Sortino ratios. Shorter-term momentum (e.g., 14-day ROC or a moving average convergence divergence (MACD) indicator) might signal shorter swing trades. We’ll formulate rules such as “buy if the 14-day ROC exceeds X%” or use crossovers of MACD signal lines.  
          - **Mean Reversion and Range Trading**: Oil prices, despite trends, often mean-revert in the short term (especially when driven to extremes by temporary factors). Strategies here might include Bollinger Bands or RSI oversold/overbought signals. For example, a Bollinger Band strategy would short the market when price moves too many standard deviations above its moving average (expecting it to fall back to the mean), and buy when it’s far below. Academic research suggests commodities like oil exhibit some mean reversion over weeks to months, though typically weaker than in other assets. We will also look at **calendar spreads** (difference between near and far futures) as a mean-reverting trade, since storage and carry costs tend to pull spreads back to equilibrium.  
          - **Breakout Strategies**: Oil often trades in ranges until a new piece of information causes a breakout. A strategy might buy when price breaks above a recent high (e.g., 20-day high) anticipating a continued rally, and sell or short on breaks below a support level. This is a variant of trend following that focuses on volatility bursts. We will test breakout rules (like Donchian Channel breakout systems) on the data.  

        **2. Statistical and Time-Series Strategies:**  
          - **ARIMA and Time-Series Forecasting**: We will build ARIMA (Auto-Regressive Integrated Moving Average) models to forecast short-term oil price movements. If the model predicts tomorrow’s price is higher than today’s by more than a certain threshold, the strategy goes long, and vice versa. ARIMA has been widely used for crude price forecasting. We may incorporate exogenous variables (ARIMAX), like global economic indicators, if they improve forecast accuracy. However, due to the noisy nature of commodity markets, pure ARIMA signals may be weak; we’ll test whether trading on ARIMA forecasts yields any edge.  
          - **GARCH and Volatility Models**: Oil prices show volatility clustering (quiet periods and stormy periods). GARCH models can forecast future volatility. While not directly predicting price direction, volatility forecasts can inform position sizing (trade smaller during high volatility to manage risk) or be combined with a mean-reversion strategy (e.g., if price is above fundamental value and volatility is rising, a reversal may loom). An advanced strategy might use a **Markov-switching GARCH** model to detect regime changes (bullish vs bearish regimes) and switch positions accordingly; research has explored this for oil and gas trading ([A Test of Using Markov-Switching GARCH Models in Oil and Natural ...](https://www.mdpi.com/1996-1073/13/1/129#:~:text=A%20Test%20of%20Using%20Markov,oil%20or%20natural%20gas%20futures)).  
          - **Statistical Arbitrage and Pairs Trading**: We will investigate if **cointegration** exists between related oil markets to exploit mispricings. A notable example is the WTI-Brent spread – if WTI and Brent prices diverge too much from their historical equilibrium, a mean-reverting trade could be: long the cheaper and short the expensive, betting the spread will converge. Fanelli et al. (2022) proposed a statistical arbitrage strategy using a cointegration relationship between WTI, Brent, and Dubai crude prices. They identified a persistent long-run equilibrium and traded on deviations from it, achieving consistent profits out-of-sample measured by total return and Sharpe ratio. We will replicate a simpler version of such a strategy by identifying one or two correlated instruments (like crude and refined products or oil equities) for pairs trading.  
          - **Machine Learning Approaches (if data/time permits)**: For completeness, we might test a basic machine learning model (like a logistic regression or random forest) using technical features to predict next-day up or down moves. However, given the scope, the focus remains on interpretable, traditional methods unless ML provides clear benefits.

        Each strategy will have clearly defined **entry and exit rules**. For example, a moving average crossover system’s rules might be: “Enter long when 50-day MA crosses above 200-day MA; exit (or go short) when 50-day drops below 200-day”. We will document such rules for all strategies and ensure they are implementable without hindsight bias (we only use past data for signals available at the time).

        ### Backtesting and Validation Methods  
        To robustly evaluate each strategy, we will perform meticulous backtesting with multiple validation techniques:  

        - **Train-Test Split and Out-of-Sample Testing**: We will split our dataset into an in-sample period (for developing and parameter tuning) and an out-of-sample period (for genuine testing). For instance, if we have data from 2000–2024, we might use 2000–2015 for initial model development and 2016–2024 to evaluate performance on unseen data. This checks if the strategy holds up on new data or if it was overfit to historical quirks.  
        - **Cross-Validation with Rolling Windows**: Because markets evolve, a rolling (walk-forward) analysis is more realistic. We will implement **rolling window backtesting** (a form of walk-forward optimization ([How to Use Walk Forward Analysis: You May Be Doing It Wrong!](https://ungeracademy.com/posts/how-to-use-walk-forward-analysis-you-may-be-doing-it-wrong#:~:text=Wrong%21%20ungeracademy,sample%20performances))): e.g., train a model on 5 years of data, test on the next 1 year, then roll forward 1 year and repeat. This technique simulates periodically re-training a strategy in production and gives multiple out-of-sample performance samples. It helps avoid **look-ahead bias** and **data-snooping bias** by continuously validating on forward time periods ([[AI & Algorithmic Trading] Common Pitfalls in Backtesting: A ...](https://medium.com/funny-ai-quant/ai-algorithmic-trading-common-pitfalls-in-backtesting-a-comprehensive-guide-for-algorithmic-ce97e1b1f7f7#:~:text=,3)).  
        - **Bootstrap and Monte Carlo**: For strategies with limited trades, we might bootstrap the returns to assess variability of outcomes. Running a Monte Carlo simulation on strategy returns (shuffling or resampling segments) can provide confidence intervals for metrics like the Sharpe ratio.  
        - **Backtesting Platform**: We will use libraries like **backtrader** (a popular Python backtesting framework) to simulate trades with realistic conditions. backtrader allows specifying contract size, leverage, and can iterate through each day’s data to apply our strategy logic. It also makes it easier to incorporate commission and slippage models. For example, we can set a \$0.02 per barrel commission (typical for futures brokers) and slippage of 1 tick to mimic trading frictions.  

        **Example Backtest Setup (Simplified)**: Below is a conceptual example using Python (without backtrader, for clarity) to backtest a moving average crossover strategy on our price data: 

        python
        # Assume df contains 'Price' and computed 'MA_short' and 'MA_long'
        df["Signal"] = 0  
        df.loc[df["MA_20"] > df["MA_50"], "Signal"] = 1  # long if short MA > long MA
        df.loc[df["MA_20"] < df["MA_50"], "Signal"] = -1  # short if short MA < long MA

        # Compute daily returns and strategy returns
        df["Return"] = df["Price"].pct_change().fillna(0)
        df["StrategyReturn"] = df["Signal"].shift(1).fillna(0) * df["Return"]  # position from previous day

        # Calculate performance metrics
        import numpy as np
        sharpe = (df["StrategyReturn"].mean() / df["StrategyReturn"].std()) * np.sqrt(252)
        total_ret = (1 + df["StrategyReturn"]).prod() - 1
        print(f"Total Return: {total_ret:.2%}, Sharpe Ratio: {sharpe:.2f}")  

        This snippet generates a position (Signal) based on the crossover rule, then calculates the strategy’s daily returns and Sharpe ratio. In practice, we would integrate more features (like position sizing or stop-loss) and use a robust framework for accuracy, but this demonstrates the logic in code. 

        **Validation Notes**: While validating, we will be vigilant about common pitfalls. **Overfitting** is managed by limiting the number of strategy parameters and using out-of-sample tests. **Look-ahead bias** is avoided by never using future data in signal calculations (for example, using .shift(1) as above ensures we only trade on yesterday’s information). We’ll also be careful about **survivorship bias** (though for oil futures, this is less relevant as we’re dealing with a continuous series, not individual companies). Finally, we will include transaction costs in backtests to ensure results are net of realistic fees and slippage.

        ### Performance Evaluation Criteria  
        To compare strategies and assess success, we define both quantitative metrics and qualitative considerations:

        - **Sharpe Ratio**: Measures risk-adjusted return, calculated as average excess return divided by the standard deviation of returns ([Sharpe Ratio: Definition, Formula, and Examples](https://www.investopedia.com/terms/s/sharperatio.asp#:~:text=What%20Is%20the%20Sharpe%20Ratio%3F)). A higher Sharpe indicates better return for unit of risk. For example, a strategy that returned 15% with 10% volatility has Sharpe ~1.5 (assuming zero risk-free rate). We target strategies with Sharpe ratios above a suitable benchmark (perhaps > 0.5 for an active strategy in commodities).  
        - **Maximum Drawdown (MDD)**: The largest peak-to-valley equity drop, indicating worst-case loss endured ([Maximum Drawdown (MDD) Defined, With Formula for Calculation](https://www.investopedia.com/terms/m/maximum-drawdown-mdd.asp#:~:text=A%20maximum%20drawdown%20,over%20a%20specified%20time%20period)). This is crucial for risk assessment – a strategy might have high returns but an intolerable drawdown. We aim to keep MDD within acceptable limits (e.g., <20%). For instance, if a strategy portfolio starts at \$100,000, grows to \$120,000, then falls to \$90,000 before rising again, the max drawdown is \$30,000 (25%). We will compute MDD for each backtest and use it to rank strategies in terms of capital preservation.  
        - **Profit Factor**: Ratio of total profit to total loss ([Which one is more critical? Percent profitable or profit factor? : r/TradingView](https://www.reddit.com/r/TradingView/comments/1eitl76/which_one_is_more_critical_percent_profitable_or/#:~:text=Only%20the%20profit%20factor%20is,you%20could%20still%20lose%20money)). This tells us for each \$1 of loss, how many \$ earned. A profit factor > 1.0 is profitable; > 2.0 is excellent. For example, profit factor = 1.5 means \$1.5 gained per \$1 lost. This complements the win/loss ratio by capturing the magnitude of wins vs losses.  
        - **Win/Loss Ratio and Win Rate**: The win rate (percentage of trades that are profitable) and the average win vs average loss. A high win rate is good, but it must be coupled with decent win sizes relative to losses. A strategy could win 60% of trades but still lose money if the 40% losing trades are much larger. Generally, a win rate above 50% with a profit factor well above 1 is desirable.  
        - **Drawdown Duration**: How long it takes to recover from drawdowns. Two strategies might both have 15% max drawdown, but if one recovers in 1 month and another in 1 year, that’s a big difference to an investor. We will note the time to new highs for each strategy’s equity curve.  
        - **Benchmark Comparison**: We will compare strategy performance against benchmarks like a simple buy-and-hold of the front-month oil future, or relevant commodity indices (e.g., the S&P GSCI Energy index). If a strategy cannot outperform a passive long position in oil on a risk-adjusted basis, it may not be worthwhile. For instance, if WTI buy-and-hold over the test period gave 10% return with 30% drawdown and Sharpe 0.3, a good strategy should beat that Sharpe and/or deliver returns with lower drawdown.  
        - **Ease of Implementation & Robustness** (qualitative): We consider how complex a strategy is to implement and maintain. A strategy with too many inputs or requiring high-frequency execution might be prone to error or difficult to execute for a typical trader. Robustness is judged by performance consistency across different market regimes; e.g., does a strategy only work in trending markets but fails in sideways markets? We prefer strategies that perform reasonably across various conditions or can be adapted.  

        We will tabulate these metrics for each strategy. For example, a table might list Strategy A vs Strategy B with their annualized return, Sharpe, max drawdown, profit factor, and win rate. This will inform which strategies merit further development.

        ### Expected Outcomes and Findings  
        We anticipate discovering that certain well-known strategies indeed provide better risk-adjusted returns in oil futures:  

        - **Momentum Strategies**: Likely to show strong absolute returns during trending periods (such as 2004-2008 oil boom, or the post-COVID demand surge) and good Sharpe ratios, but may suffer whipsaw losses during range-bound periods. For instance, a moving average crossover might catch the 2020 rebound and yield a high Sharpe, but chop around in 2015–2019 when oil had no clear trend. We expect momentum/trend strategies to do well overall if parameters are chosen to avoid too many false signals.  
        - **Mean Reversion**: These strategies may excel when oil prices overshoot fundamentals (e.g., shorting after a supply shock price spike, or buying after a panic sell-off). We expect a statistical arbitrage approach (like the WTI-Brent spread trade) to produce steady, small profits with low volatility, hence a high Sharpe and low drawdown, but its total returns might be modest. If cointegration holds, these strategies could be a valuable low-risk complement.  
        - **Time-Series/ARIMA**: Pure forecasting models might not beat the naive strategies by much. Oil markets are notoriously hard to predict due to news shocks. ARIMA or GARCH-based trading might yield only slight improvements over random, unless augmented by other signals. We may find that including external data (like global rig counts or inventory changes) in these models provides better forecasts. The expectation is that simple technical rules might outperform complex statistical models in a risk-adjusted sense for trading purposes, as suggested by some literature.  
        - **Risk-Adjusted Insights**: We will likely see that no strategy is free of downside. For example, a momentum strategy might have a higher Sharpe but also a relatively high drawdown at some point. Conversely, a hedging or spread strategy might have low drawdowns but also low returns. By examining metrics like the Calmar ratio (Return/MDD) or Sortino ratio (which focuses on downside deviation), we will identify which strategy gives the best *risk-adjusted* returns. We anticipate at least one strategy showing a significantly better Sortino ratio than others, indicating it manages downside risk well.  

        In terms of risk management, we expect to underscore the importance of position sizing and stop-loss rules. A strategy that appears profitable might turn out to be sensitive to large moves (e.g., short straddle-like behavior – picking pennies but susceptible to a steamroller). Those will be flagged as high-risk. We aim to refine each strategy (for example, adding a stop-loss at 10% adverse move, or taking profits at certain levels) to improve the overall profile.

        ### Example Backtest Results (Hypothetical)  
        After running backtests, we will compile key results for illustration. For instance:  

        - **Testing Period**: 2010-2020 for in-sample, 2021-2024 out-of-sample.  
        - **Momentum Strategy**: 50/200-day MA crossover yielded an annualized return of ~12% with Sharpe ~0.8, max drawdown 18%, profit factor 1.6, win rate 55%. It beat buy-and-hold (which had ~5% annual return, Sharpe 0.3, drawdown 50% during 2014-2015 price collapse). However, out-of-sample Sharpe dropped to 0.5, indicating performance decayed in recent volatile years – suggesting the need for adaptive parameters.  
        - **Mean Reversion Strategy** (Bollinger Band on weekly data): Annualized return ~8%, Sharpe 0.9, very low drawdown ~10%, profit factor 2.2, win rate only 40% (fewer but larger winning trades). It was flat during strong trends (missed big 2017 rally) but protected capital well during reversals.  
        - **Statistical Arbitrage (WTI-Brent Spread)**: Annual return ~4% but Sharpe ~1.5 (low volatility strategy), drawdown <5%. Profit factor ~1.4. Served as a good hedge in the portfolio (often making money when outright oil strategies lost, especially during dislocations like 2011 Arab Spring where Brent spiked more than WTI).  
        - **Time-Series Forecasting Model**: GARCH-based strategy (long when forecast next-day return > 0) gave mixed results – roughly 6% annual return, Sharpe 0.4, drawdown 20%. It had many false signals; when combined with a filter (only trade if predicted move is large enough to overcome costs), the Sharpe improved slightly. This indicates that simple statistical models alone might not capture the market as well as combinations of signals.  

        These results will be presented with appropriate caveats. We will emphasize avoiding **overfitting**: for example, a strategy that did amazingly well in backtests with dozens of parameters likely overfit (as one Reddit discussion put it, unrealistically high profit factors and win rates are a red flag for overfitting ([Which one is more critical? Percent profitable or profit factor? : r/TradingView](https://www.reddit.com/r/TradingView/comments/1eitl76/which_one_is_more_critical_percent_profitable_or/#:~:text=%E2%80%A2))). Thus, our final recommended strategies will be ones that show robust performance across different periods and have sound economic rationale.

        ### Risk Constraints and Management  
        Throughout strategy development, we impose risk management rules to ensure strategies meet certain risk criteria:  

        - **Position Sizing**: We will not risk more than a set percentage of capital on any single trade (e.g., 2% risk per trade is a common rule). For futures, this could mean adjusting the number of contracts based on volatility (e.g., trading fewer contracts when oil volatility is high, to keep value-at-risk constant).  
        - **Leverage Limits**: We will assume a reasonable use of leverage for futures. Each WTI futures contract represents 1,000 barrels, so at \$70/barrel it’s \$70,000 exposure. If our notional capital is \$100,000, one contract is 0.7x leverage. We might cap at, say, 2 contracts (\$140k exposure, 1.4x leverage) for safety, or require additional capital for multiple contracts.  
        - **Stop-Loss and Take-Profit**: For some strategies, implementing a stop-loss (e.g., exit if price moves 5% against our position) can control tail risk. Similarly, taking profit at certain targets (like 10% gain) can lock in wins in volatile markets. Our backtests will experiment with these – sometimes stops can improve drawdown but at the cost of lower returns if they trigger prematurely.  
        - **Drawdown Control**: If a strategy incurs a drawdown beyond a threshold (say 15%), one might stop trading or reduce positions until it recovers in paper testing. We will note whether such rules would have helped historically (e.g., halting trading during 2020’s unprecedented volatility might have been wise).  
        - **Diversification**: While our focus is oil, a strategy’s risk can be lowered by diversifying across related assets or timeframes. For example, trading both WTI and Brent or including some gasoil/crack spread positions might smooth performance. We will see if combining strategies (momentum + mean reversion in a portfolio) yields a more stable equity curve.  

        Our performance benchmarks will incorporate these risk constraints. For instance, a strategy must not only beat the benchmark returns but also do so within our risk limits (lower drawdown, acceptable daily volatility, etc.). The industry often compares a strategy’s **Sortino ratio** (focus on downside risk) or **Calmar ratio** (return / MDD) against benchmarks – we will do the same to ensure our strategies provide a superior *risk-adjusted* profile compared to simply holding oil or an oil index.

        ## Python Implementation Details  

        We will provide detailed Python code for each step of the analysis, ensuring that readers can replicate and modify the strategies:

        ### Data Acquisition and Preprocessing (Python)  
        Using libraries like pandas yfinance (or other data sources), and NumPy, we will demonstrate how to load the data and prepare it. For example: 

        python
        import pandas as pd

        # Fetch historical WTI prices via Yahoo Finance (as an example, requires yfinance)
        # Alternatively, one could load from a CSV as shown earlier.
        import yfinance as yf
        wti = yf.download("CL=F", start="2015-01-01", end="2023-12-31")
        wti = wti["Adj Close"].rename("WTI_Price")

        # Basic cleaning
        wti = wti.dropna()  # drop days with no price
        # Add technical features
        wti_df = pd.DataFrame(wti)
        wti_df["MA_50"] = wti_df["WTI_Price"].rolling(50).mean()
        wti_df["MA_200"] = wti_df["WTI_Price"].rolling(200).mean()
        wti_df["Returns"] = wti_df["WTI_Price"].pct_change() 

        *Explanation:* This code uses yfinance to download WTI continuous futures daily prices, then calculates 50-day and 200-day moving averages and daily returns. (Note: If yfinance is not available in the environment, one could use pandas_datareader with FRED or a pre-downloaded dataset. The code is illustrative of typical usage.)

        We will also show how to handle missing data, for instance: 

        python
        # Forward-fill any missing prices (if using a dataset with gaps)
        wti_df.ffill(inplace=True)
        

        And how to remove outliers if needed, e.g., capping returns beyond a certain percentile which might indicate bad data.

        ### Strategy Implementation and Backtesting (Python)  
        Using the processed dataset, we will implement strategies. We may use the **backtrader** library for a full-featured backtest. For transparency, we’ll also present a simplified backtest in raw pandas for at least one strategy. 

        **Example: Moving Average Crossover Strategy with Backtrader**  
        python
        import backtrader as bt

        # Define a strategy in backtrader
        class MACrossoverStrategy(bt.Strategy):
            params = (("fast", 50), ("slow", 200), )
            def __init__(self):
                self.dataclose = self.datas[0].close
                self.ma_fast = bt.indicators.SimpleMovingAverage(self.datas[0], period=self.params.fast)
                self.ma_slow = bt.indicators.SimpleMovingAverage(self.datas[0], period=self.params.slow)
                self.crossover = bt.indicators.CrossOver(self.ma_fast, self.ma_slow)
            def next(self):
                if not self.position:  # not in the market
                    if self.crossover > 0:  # fast MA crosses above slow MA
                        self.buy()
                else:
                    if self.crossover < 0:  # fast MA crosses below slow MA
                        self.sell()

        # Set up backtrader Cerebro engine
        cerebro = bt.Cerebro()
        cerebro.broker.set_cash(100000.0)
        data = bt.feeds.PandasData(dataname=wti_df)  # use our prepared DataFrame
        cerebro.adddata(data)
        cerebro.addstrategy(MACrossoverStrategy)
        cerebro.addsizer(bt.sizers.FixedSize, stake=1)  # trade 1 contract
        # Run backtest
        result = cerebro.run()
        final_value = cerebro.broker.getvalue()
        print(f"Final Portfolio Value: ") 

        This code defines a strategy class for backtrader that uses a 50/200-day moving average crossover. It buys one contract when the fast MA crosses above the slow MA and sells when the reverse happens. The backtest engine (Cerebro) runs through the data and updates the portfolio value. After running, it prints the final portfolio value (which can be compared to the starting cash to compute return). We would expand this to record the performance metrics over time or use Analyzer classes in backtrader to get Sharpe, drawdown, etc., but for brevity the example focuses on structure.

        **Other Strategies Implementation**: We will provide similar code structure for a momentum strategy (e.g., using RSI or ROC – backtrader has built-in indicators for RSI which we can leverage) and for a mean reversion strategy (perhaps using Bollinger Bands indicator and placing orders accordingly). For statistical strategies like pairs trading, we might not use backtrader’s full capabilities but instead do a custom backtest: for example, z-score of the spread between WTI and Brent and trade on that basis. All code will be commented for clarity.

        ### Performance Evaluation (Python)  
        After each backtest, we’ll use Python to calculate the metrics: Sharpe, drawdown, etc., as demonstrated earlier. For instance: 

        python
        import numpy as np

        # Assuming we have a DataFrame strategy_df with a column 'StrategyReturns'
        excess_returns = strategy_df["StrategyReturns"]  # (if we subtract risk-free rate, but assume ~0 for short horizon)
        sharpe_ratio = (excess_returns.mean() / excess_returns.std()) * np.sqrt(252)
        cum_returns = (1 + strategy_df["StrategyReturns"]).cumprod()
        max_drawdown = 1 - (cum_returns / cum_returns.cummax()).min()

        print(f"Sharpe Ratio: {sharpe_ratio:.2f}")
        print(f"Max Drawdown: {max_drawdown:.2%}")
        

        This would output the Sharpe ratio and maximum drawdown for the strategy. Similar calculations would be done for profit factor and win rate: 

        python
        # Profit factor and win rate
        total_profit = strategy_df.loc[strategy_df["StrategyReturns"] > 0, "StrategyReturns"].sum()
        total_loss = abs(strategy_df.loc[strategy_df["StrategyReturns"] < 0, "StrategyReturns"].sum())
        profit_factor = total_profit / total_loss if total_loss != 0 else np.inf
        wins = (strategy_df["StrategyReturns"] > 0).sum()
        losses = (strategy_df["StrategyReturns"] < 0).sum()
        win_rate = wins / (wins + losses) * 100
        print(f"Profit Factor: {profit_factor:.2f}, Win Rate: {win_rate:.1f}%")
      

        These code snippets will be part of the document to show how evaluation criteria are computed in practice.

        All Python code will be provided in a coherent manner, typically grouped by function: data loading, indicator calculation, backtesting, and evaluation. This ensures that someone reviewing the document can follow the process end-to-end, from raw data to strategy performance.

        ## Real-Time Implementation Considerations  
        Transitioning from backtesting to live trading requires additional considerations beyond what the historical analysis covers:

        - **Data Feed and Latency**: In live trading, we need a reliable real-time data feed for oil prices. API integrations might include broker APIs (Interactive Brokers TWS API, for example) or data services (Quandl, paid feeds like Bloomberg or Reuters for tick data). The strategies we developed need to ingest streaming prices and output signals promptly. Latency is crucial if strategies operate on intraday data; even for daily strategies, ensuring end-of-day data is correct and timely is important (especially around contract roll dates or settlement times). We will highlight how one might use a scheduler to run end-of-day strategy decisions or maintain a live order if conditions are met (e.g., if at 2:30pm the MAs crossed, send an order before market close).  
        - **Order Execution**: In simulation we assumed immediate execution at the price point. In reality, market orders can slip, and limit orders may not fill. For crude oil futures, liquidity is high in near months, but still, placing orders around volatile periods (like inventory report releases) can see slippage. We must account for this by either widening our expected entry price (placing limits) or accepting some slippage in performance. Also, partial fills and the fact you can’t trade fractional contracts must be handled by the trading software. We will recommend always testing strategies in a paper trading environment connected to the exchange before going live.  
        - **Transaction Costs**: In backtests we included a static cost, but in live trading commissions vary by broker and volume, and there are also exchange fees. We’ll ensure to incorporate these in any live strategy. For a frequent trading strategy, these costs can turn a profitable strategy unprofitable, so the trade frequency observed in backtest will be reconsidered – perhaps we tune the strategy to trade less often or only when the signal is strong to overcome costs.  
        - **Risk Monitoring**: Live, one must continuously monitor risk. We would implement real-time checks such as: if the strategy’s drawdown exceeds X%, automatically reduce positions or stop trading (circuit breaker logic). Tools like stop-loss orders can be placed in the market ahead of time. Moreover, **margin** must be managed – if oil prices spike and we’re short, our account needs enough margin to sustain the position. We will outline how to monitor margin usage and set alerts.  
        - **Robustness to Regime Changes**: Markets can change due to structural shifts (e.g., the shale revolution changing oil dynamics, or new regulations). A strategy that worked may need recalibration. In live deployment, one should periodically re-evaluate model parameters (maybe using a monthly or quarterly retraining on the latest data for statistical models). We caution that over-optimization in live trading is dangerous, but completely static strategies might decay. A balance via walk-forward optimization (as done in backtest) can continue in live trading by updating parameters with new data as it comes.  
        - **Automation and Infrastructure**: Implementing these strategies in real-time likely requires writing a trading bot or using algorithmic trading platforms. We’ll discuss a potential stack: using Python with broker APIs (like IB’s API or a platform like QuantConnect) or using specialized software. Key points include handling reconnects, logging all trades, and perhaps a fail-safe to flatten positions on critical errors. If using Python, libraries like ccxt (for exchange connections) or IB’s official API can be used for order routing. We won’t provide full code for live trading (as that’s beyond scope), but we will give an overview of how one would adapt our backtest code to a live setting, such as turning the strategy logic into event-driven functions that act on incoming price ticks.  
        - **Live Monitoring and Alerts**: It’s wise to have a dashboard or alert system. For example, if a large adverse move happens, the system could alert the trader via email or text. We’ll note this as a practical consideration – technology like webhooks or simple messaging can be integrated.  

        In summary, the shift to real-time means dealing with the unpredictability of *now*. Our document will close with a checklist for anyone looking to deploy: ensure data integrity, account for slippage, have risk management in code (not just on paper), and test in simulation thoroughly. We’ll also mention compliance (if trading through certain accounts, adhering to position limits or reporting if you’re a large trader, etc., though at our scale it may not matter). 

Interests:
- Furniture Design. Mostly interested in interior design but I was inspired by wooj.design: https://www.instagram.com/wooj.design/?hl=en . Still working on the solidworks plan to print on the 3d printer.
- Blockchain technology. Been using blockchain and researching into it. From layer 2 solutions, Ai agents, and real world applications, ive been heavily interested in its technology. I would be lying if I didn't care about the money involved - I do have investments in this space. Currently interested in Sonar ping: https://www.sonarplatform.io/ .
- Culinary arts, especially Italian, Korean, Chinese cuisines. Have been diving more into compounded butter combinations as of late.


Contact:
- Email: park.julius@outlook.com
- LinkedIn: https://www.linkedin.com/in/julius-park/
- GitHub: https://github.com/sejoonpark99

`;

export async function POST(req: NextRequest) {
  try {

    // Get client IP address
    const ip = req.headers.get('x-forwarded-for') || 'unknown';

    // Apply rate limiting
    const rateLimitResult = await rateLimit(ip);
    
    // If rate limit exceeded, return 429 Too Many Requests
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': String(rateLimitResult.limit),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(Math.floor(Date.now() / 1000) + RATE_LIMIT_WINDOW)
          }
        }
      );
    }
    // Get message from request body
    const body = await req.json();
    const { message, history = [] } = body;
    
    // Prepare messages for OpenAI
    const messages = [
      {
        role: 'system',
        content: `You are Julius Park, a software engineer at ComputerTalk. You're chatting directly with someone visiting your portfolio website. Respond in first person as Julius Park himself (not as an assistant or virtual entity).

Important:
- You ARE Julius Park, not a bot or assistant representing him
- Respond in a direct, personal manner as if you (Julius) are having a live chat
- Keep responses relatively concise and conversational
- Be professional but personable, showing your personality
- Use straightforward language without being overly formal
- Occasionally use "I" statements to emphasize that you are Julius
- Don't refer to yourself in third person
- Don't say things like "As Julius, I..." - you're just you
- Never say you're an AI, bot, or assistant - you're Julius Park
- You shouldn't answer random questions, like if they ask you how to bake a cake, it has nothing to do with what ive talked about. 
- Do not use exclamation marks,

Here's information about you (Julius):
${juliusProfile}

Remember, you're not an AI assistant helping a user - you're Julius Park having a direct conversation with someone interested in your work.
`
      },
      // Include conversation history
      ...history,
      // Add the current message
      { role: 'user', content: message }
    ];
    
    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // You can use 'gpt-4' if you have access and prefer it
      messages: messages,
      max_tokens: 500,
      temperature: 0.7,
    });
    
    // Get the response
    const responseMessage = completion.choices[0].message.content;
    
    return NextResponse.json(
      { message: responseMessage },
      {
        headers: {
          'X-RateLimit-Limit': String(rateLimitResult.limit),
          'X-RateLimit-Remaining': String(rateLimitResult.remaining),
          'X-RateLimit-Reset': String(Math.floor(Date.now() / 1000) + RATE_LIMIT_WINDOW)
        }
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
}