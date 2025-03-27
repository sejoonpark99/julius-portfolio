import React, { useRef } from 'react';
import Row from './Row';
import { RowProps } from '../types/types';

const portfolioData: RowProps[] = [
  //STACK
  {
    title: "Stack",
    images: [
      { src: '/img/stack/python.svg' },
      { src: '/img/stack/go.svg' },
      { src: '/img/stack/javascript.svg' },
      { src: '/img/stack/csharp.svg' },
    ],
    previewItem: {
      title: "Stack",
      images: [
        // { src: '/img/stack/python.svg' },
        // { src: '/img/stack/go.svg' },
        // { src: '/img/stack/javascript.svg' },
        // { src: '/img/stack/csharp.svg' },
        { src: '/img/stack/typescript.svg' },
        { src: '/img/stack/cplusplus.svg' },
        { src: '/img/stack/haskell.svg' },
        { src: '/img/stack/angular.svg' },
        { src: '/img/stack/dotnetcore.svg' },
        { src: '/img/stack/nextjs.svg' },
        { src: '/img/stack/django.svg' },
        { src: '/img/stack/react.svg' },
        { src: '/img/stack/nodejs.svg' },
        { src: '/img/stack/solidity.svg' },
      ]
    },
    index: 0
  },
  //EXPERIENCE
  {
    title: "Experience",
    images: [
      { 
        src: '/img/econ.png', 
        details: {
          title: "Economical Insurance",
          role: "Quality Assurance",
          date: "September 2018 - December 2018",
          description: "Internship",
          overview: "Contributed to the enhancement of client address accessibility and vehicle status tracking through test script development and database optimization.",
          technicalDetails: "Utilized QTP for test automation and improved PostgreSQL query speed by 30%. Collaborated on vehicle tracker visualization in React.",
          challenges: "Optimized data workflows between PostgreSQL and Snowflake data stores while ensuring data integrity and improving system performance.",
          duration: "4 months",
          technologies: ["QTP", "PostgreSQL", "React", "Snowflake"],
        }
      },
      { 
        src: '/img/8.png', 
        details: {
          title: "Arcadis IBI Group",
          role: "Project Designer",
          date: "January 2022 - April 2022",
          description: "Internship",
          overview: "Created specialized design tools that significantly improved the efficiency of grading plan updates while managing communication with subconsultants.",
          technicalDetails: `### OVERALL ARCHITECTURE
      
      \`\`\`
      Plugin-Based Integration:
      - Designed as a Civil 3D plugin for seamless integration into the AutoCAD environment
      - Enabled operation within the context of existing Civil 3D projects
      - Allowed for direct manipulation of drawing entities through the AutoCAD object model
      \`\`\`
      
      \`\`\`
      Dual-Layer Approach:
      - Presentation & Logic Layer (.NET): Handled user interactions, parameter management, and overall control flow
      - Data Access & Manipulation Layer (ObjectARX): Enabled direct manipulation of drawing entities
      - Integrated both layers to create a cohesive tool that could update grading plans programmatically
      \`\`\`
      
      ### IMPLEMENTATION DETAILS
      
      \`\`\`
      Parameterization of Grading Plans:
      - Developed system to accommodate 20 different grading parameters
      - Each parameter could be adjusted independently for dynamic updates
      - Parameters were bound to specific geometric and design rules
      - Ensured consistency and accuracy across all plan revisions
      \`\`\`
      
      \`\`\`
      Command and Event Handling:
      - Implemented custom commands using ObjectARX to initiate updates and exports
      - Created monitoring system for changes within Civil 3D sessions
      - Enabled real-time updates to reduce manual errors
      - Built robust validation logic to manage potential conflicts
      \`\`\`
      
      ### SURVEY DATA INTEGRATION
      
      \`\`\`
      Survey Data Export Functionality:
      - Created tools to convert raw survey data into AutoCAD-compatible formats
      - Developed overlay system to integrate survey data with grading plans
      - Worked directly with Land Development team to establish data workflows
      - Streamlined the import/export process for improved efficiency
      \`\`\`
      
      \`\`\`
      Collaboration Improvements:
      - Integrated tool into existing team workflows
      - Enabled seamless data sharing between design and survey teams
      - Reduced design iteration time through automated data processing
      - Improved service quality through more accurate plan generation
      \`\`\``,
          duration: "4 months",
          technologies: [".NET", "ObjectARX", "AutoCAD", "CIVIL3D"],
        }
      },
      { 
        src: '/img/7.jpg', 
        details: {
          title: "OpenText",
          role: "Software Engineer",
          date: "September 2022 - December 2022",
          description: "Internship",
          technicalDetails: "Utilized React, Redux, GraphQL, and SpringBoot to create flexible and reusable dashboard components. Worked on modularizing statistical data for efficient direct database querying.",
          challenges: "Balanced feature development with maintenance of a large legacy codebase while meeting tight delivery deadlines.",
          duration: "4 months",
          technologies: ["React", "Redux", "GraphQL", "SpringBoot", "C#"],
          features: [
            "Modular dashboard components",
            "Statistical data processing",
            "Direct database querying optimization",
            "Feature presentations to regional director",
            "Ahead-of-schedule delivery"
          ]
        }
      },
      { 
        src: '/img/6.png', 
        details: {
          title: "ComputerTalk",
          role: "Software Engineer",
          date: "July 2023 - Present",
          description: "Fulltime",
          technicalDetails: `### AZURE OPENAI AGENTIC SYSTEM FOR IVR

          \`\`\`
          Objective & Use Case:
          - Developed a next-generation Interactive Voice Response (IVR) system that dynamically adapts conversation flows based on individual caller 
            contexts and history
          - Implemented Azure OpenAI to create an "agentic" conversational system utilizing each contact's metadata including account history, 
            interaction patterns, and demographic information
          - Integrated real-time transcription capabilities through Azure Cognitive Services, enabling the IVR to summarize prior conversation points 
            and refine responses contextually
          \`\`\`
          
          \`\`\`
          Why Low Latency is Critical:
          - User Experience: Callers expect near-immediate responses during interactions; delays significantly reduce trust and increase hang-up rates, 
            especially during sensitive payment transactions
          - Compliance Requirements: PCI-DSS regulations for payment data processing demand reliable, efficient call flows to avoid user frustration and 
            potential sensitive data exposure
          - System Scalability: In high-volume contact centers handling thousands of concurrent calls, even small delays of a few hundred milliseconds compound 
            significantly and affect large user populations
          \`\`\`
          
          \`\`\`
          How Latency Was Lowered:
          - Architecture Optimization: Minimized internal service hops by strategically colocating essential microservices (payment processor and AI decision 
            service) within the same network region
          - Advanced C# Implementation: Wrote sophisticated asynchronous, non-blocking code utilizing the .NET Task Parallel Library (TPL), ensuring the IVR 
            service efficiently handles concurrent requests without thread starvation
          - Redis Caching Strategy: Implemented Redis to store frequently accessed data including session tokens, partial transcription states, and AI 
            inference responses, eliminating expensive database round-trips
          \`\`\`
          
          ### SIGNALR TO REDIS/KAFKA FOR REAL-TIME MESSAGING
          
          \`\`\`
          Initial Implementation:
          - Deployed SignalR for robust real-time client-server communication across the contact center platform
          - Enabled immediate updates to agent dashboards, supervisor consoles, and IVR status displays without page refreshes
          - Created seamless real-time notification system for critical system events and status changes
          \`\`\`
          
          \`\`\`
          Why Redis/Kafka Became Necessary:
          - Scale Limitations: With over 100,000 concurrent data points from calls, agent activities, and system events, a single SignalR hub became a 
            performance bottleneck
          - Redis Implementation: Integrated Redis as an in-memory pub/sub mechanism for handling ephemeral messages, significantly reducing direct load on the 
            SignalR server
          - Kafka Integration: Deployed Kafka for high-throughput event streaming with reliable, durable storage, enabling event replay capabilities for 
            analytics and compliance auditing
          - Architecture Benefits: Successfully offloaded message queue responsibilities to dedicated services, preventing SignalR from performing dual roles as message broker and real-time hub
          - Performance Outcomes: Dramatically improved system fault tolerance, throughput capacity, and horizontal scalability for enterprise-level deployment
          \`\`\`
          
          ### AGGRID & AGCHARTS FOR REAL-TIME DATA VISUALIZATION
          
          \`\`\`
          Real-Time Data Monitoring Solution:
          - Implemented high-frequency visualization system handling over 100,000 continuously updating datasets including active calls, queue states, 
            and agent statuses
          - Optimized agGrid implementation with advanced performance features:
            - Virtual DOM and virtualized scrolling for fluid rendering of massive datasets without UI freezing or memory issues
            - Server-side row model configuration, offloading data operations to the backend for significantly improved client-side performance
            - Custom cell renderers and formatters for intuitive real-time status visualization
          \`\`\`
          
          \`\`\`
          Historical Dashboards and Analytics:
          - Designed comprehensive historical data visualization system with agCharts providing stakeholders with actionable insights
          - Created interactive visualizations for call volumes, agent performance metrics, and payment success rates across customizable time periods
          - Implemented advanced interactive features including drill-down capabilities, data filtering, and flexible grouping options specifically for 
            management reporting and compliance reviews
          - Optimized chart rendering for handling millions of data points while maintaining responsive user experience
          \`\`\`
          
          \`\`\`
          Technical Rationale for Angular Framework:
          - Leveraged Angular's component-based architecture to create an extensive library of reusable, maintainable UI components for data grids and 
            visualization charts
          - Utilized Angular's powerful two-way data binding to enable instantaneous UI updates when receiving SignalR or Redis/Kafka messages indicating 
            data changes
          - Implemented Angular services for centralized state management across complex dashboard interfaces
          - Created custom directives for specialized real-time data visualization components specific to contact center operations
          \`\`\`
          
          ### DATABASE QUERY OPTIMIZATION & CACHING
          
          \`\`\`
          Large-Scale Data Processing Challenges:
          - System regularly processed over 1 million agent statistics records covering call handling metrics, payment confirmation data, and customer 
            interaction details
          - Stakeholders required frequent ad-hoc reporting capabilities with customizable parameters, preventing simple pre-calculation of common queries
          - Initial query performance was inadequate for real-time dashboard requirements, with some complex reports taking 7+ seconds to load
          \`\`\`
          
          \`\`\`
          Comprehensive Optimization Techniques:
          - Database Index Engineering: Created sophisticated composite indexes on frequently queried column combinations, particularly optimizing for agent_id 
            and timestamp-based filtering
          - Advanced Query Restructuring: Conducted in-depth execution plan analysis to identify and eliminate unnecessary JOINs and subqueries, replacing them 
            with more efficient Common Table Expressions (CTEs) and strategically partitioned views
          - Multi-layered Caching Implementation:
            - Application-level caching using memory-efficient data structures for frequent query results
            - Implemented intelligent cache invalidation strategies based on data update patterns
            - Configured query routing and load balancing to direct read-only requests to replicated database instances, significantly reducing primary 
              node load
          \`\`\`
          
          \`\`\`
          Measurable Performance Results:
          - Achieved average query execution time reduction of over 5 seconds for complex reporting queries
          - Improved dashboard loading times from 7+ seconds to under 2 seconds for most user scenarios
          - Enabled real-time data visualization for supervisors monitoring agent performance
          - Maintained query optimization effectiveness even as data volumes grew by approximately 30% during the project lifecycle
          \`\`\`
          
          ### AI-POWERED CHATBOT COLLABORATION
          
          \`\`\`
          Software Engineering Contributions to ML Implementation:
          - Data Infrastructure Development: Designed and maintained sophisticated data pipelines for ML model training and evaluation, including conversation 
            transcript extraction, sensitive data anonymization, and optimal format transformation
          - API Integration Architecture: Developed comprehensive REST and gRPC endpoints connecting Azure OpenAI model outputs with existing .NET service 
            ecosystem, including user identity services, chat interfaces, and IVR bridging components
          - Deployment Automation: Engineered CI/CD pipelines for automated ML model deployment using containerization with Docker and Azure Container 
            Instances, enabling seamless model updates and versioning
          \`\`\`
          
          \`\`\`
          Technical Integration Components:
          - Azure Bot Service Implementation: Configured and customized the foundational chatbot framework with Language Understanding Intelligent Service 
            (LUIS) integration for natural language entity extraction and intent identification
          - Middleware Orchestration Layer: Developed sophisticated middle-tier services coordinating interactions between the conversational bot, machine 
            learning inference services, and various data repositories while ensuring consistent session state and user context maintenance
          - Real-Time Data Integration: Engineered immediate data lookup capabilities for responding to time-sensitive user queries (e.g., "What is my payment 
            status?") by connecting the chatbot to optimized SQL queries and cached data sources
          \`\`\`
          
          \`\`\`
          Business and User Experience Outcomes:
          - Created a holistic conversational platform extending the "agentic system" principles from IVR to web/mobile channels, leveraging comprehensive user 
            profile metadata to personalize interactions across touchpoints
          - Achieved measurable efficiency improvements by successfully offloading 35% of basic customer queries to the chatbot system, allowing human agents 
            to focus on complex issues requiring personal attention
          - Enhanced overall customer satisfaction metrics through faster, more contextually relevant interactions, with post-implementation surveys showing a 
            24% improvement in resolution satisfaction scores
          \`\`\``,
          duration: "2 years",
          technologies: ["TypeScript", "Angular", "C#", ".NET Core", "Redis", "SQL", "SignalR", "gRPC", "OpenAI TTS"],
        }
      },
      { 
        src: '/img/blank.jpg',
        details: {
        }
      },
    ],
    previewItem: {
      title: "Experience",
      images: [
      ]
    },
    index: 1
  },
  //PROJECTS
  {
    title: "Projects/Algo Trading",
    images: [
      { 
        src: '/img/10.jpg',
        details: {
          title: "Setup: Interactive Brokers API Trading System",
          description: "A Python-based trading system for Interactive Brokers. This is purely for setup",
          overview: "This system provides a simplified trading interface for Interactive Brokers, allowing for both manual and automated trading operations through a streamlined command-line interface and API integration. This is purely for setup",
          technicalDetails: `# Interactive Brokers Trading System

## System Configuration
\`\`\`python
# System Configuration
PAPER_PORT = 7497
LIVE_PORT = 7496
IS_PAPER_TRADING = True  # Toggle for paper/live trading
\`\`\`

## Core Components

### 1. Trading Terminal
\`\`\`python
def print_menu():
  """Print the main menu options"""
  print("Please select an option:")
  print("n🏢 Stocks:")
  print("1. Place Stock Limit Order")
  print("2. Place Stock Market Order")
  print("n📈 Futures:")
  print("3. Place Futures Limit Order")
  print("4. Place Futures Market Order")
  print("n📊 Account:")
  print("5. View Open Positions")
  print("6. Close All Positions")
  print("7. Exit")
\`\`\`

### 2. Contract Creation
\`\`\`python
def futuresContract(symbol, expiry, exchange="CME"):
  """Create a futures contract"""
  contract = Contract()
  contract.symbol = symbol
  contract.secType = "FUT"
  contract.exchange = exchange
  contract.currency = "USD"
  contract.lastTradeDateOrContractMonth = expiry  # Format: YYYYMM

  # Map common futures symbols to their exchange
  exchange_map = {
      "ES": "CME",   # E-mini S&P 500
      "NQ": "CME",   # E-mini NASDAQ
      "YM": "CBOT",  # E-mini Dow
      "CL": "NYMEX", # Crude Oil
  }

  if symbol in exchange_map:
      contract.exchange = exchange_map[symbol]

  return contract
\`\`\`

### 3. Order Management
\`\`\`python
def marketOrder(direction, quantity):
  """Create a basic market order"""
  order = Order()
  order.action = direction
  order.orderType = "MKT"
  order.totalQuantity = quantity
  return order

def limitOrder(direction, quantity, limit_price):
  """Create a basic limit order"""
  order = Order()
  order.action = direction
  order.orderType = "LMT"
  order.totalQuantity = quantity
  order.lmtPrice = limit_price
  return order
\`\`\`

### 4. Connection and Authentication

\`\`\`python
# Connect to IB
port = PAPER_PORT if IS_PAPER_TRADING else LIVE_PORT
app.connect("127.0.0.1", port, clientId=1)
\`\`\`

### 5. Position Management
\`\`\`python
def close_position(app, position):
  """Close a single position with appropriate order type"""
  contract = position["contract"]
  pos_size = position["position"]

  # Determine order action (opposite of position)
  action = "SELL" if pos_size > 0 else "BUY"
  quantity = abs(pos_size)

  # Create and place order
  order = marketOrder(action, quantity, contract.secType)
  app.placeOrder(order_id, contract, order)
\`\`\`

## Usage
\`\`\`
1. Ensure TWS or IB Gateway is running
2. Launch the trading terminal
3. Select the desired trading operation
4. Enter requested parameters (symbol, quantity, price)
5. Confirm execution
\`\`\``,
          date: "2024",
          technologies: ["Python", "Interactive Brokers API", "Threading", "Command Line Interface", "Futures Trading", "Equities Trading"],
        }
      },
      {
        src: '/img/11.avif',
        details: {
          title: "Hybrid Intraday Algo: Trend, Mean Reversion, Arbitrage",
          description: "A comprehensive algorithmic trading system that integrates short-term momentum, mean-reversion, and statistical arbitrage techniques with high-frequency execution.",
          overview: "This strategy employs a multi-technique approach to capitalize on intraday price movements. It dynamically shifts capital between momentum trades (to ride established trends) and mean-reversion trades (to exploit price pullbacks and divergences), while also implementing market-neutral statistical arbitrage (e.g., pairs trading). High-frequency trading (HFT) enables rapid order execution, capturing fleeting price inefficiencies and closing positions before the end of the trading day to avoid overnight risks.",

          technicalDetails: `# Hybrid Intraday Algorithmic Trading Strategy

          ## Strategy Components
          
          ### 1. Trend-Following (Momentum)
          \`\`\`python
          # Signal Generation using moving average crossovers
          df['MA_fast'] = df['Price1'].rolling(window=20).mean()
          df['MA_slow'] = df['Price1'].rolling(window=50).mean()
          
          # Generate momentum signal
          momentum_signal = 1 if df['MA_fast'].iloc[-1] > df['MA_slow'].iloc[-1] else -1
          \`\`\`
          
          ### 2. Mean-Reversion
          \`\`\`python
          # Calculate z-score for mean reversion
          price_mean = df['Price1'].rolling(window=50).mean()
          price_std = df['Price1'].rolling(window=50).std()
          df['Price_z_score'] = (df['Price1'] - price_mean) / price_std
          
          # Generate mean reversion signal
          z_score = df['Price_z_score'].iloc[-1]
          mean_rev_signal = -1 if z_score > 2 else 1 if z_score < -2 else 0
          \`\`\`
          
          ### 3. Statistical Arbitrage (Pairs Trading)
          \`\`\`python
          # Calculate spread and z-score between correlated assets
          df['Spread'] = df['Price2'] - df['Price1']
          spread_mean = df['Spread'].rolling(window=50).mean()
          spread_std = df['Spread'].rolling(window=50).std()
          df['Spread_Z'] = (df['Spread'] - spread_mean) / spread_std
          
          # Generate pairs trading signal
          spread_z = df['Spread_Z'].iloc[-1]
          pairs_signal = {
              "asset1": -1 if spread_z > 2 else 1 if spread_z < -2 else 0,
              "asset2": 1 if spread_z > 2 else -1 if spread_z < -2 else 0
          }
          \`\`\`
          
          ### 4. Risk Management
          \`\`\`python
          def setup_risk_parameters(capital, risk_per_trade=0.01):
              """Configure risk management parameters"""
              max_risk_amount = capital * risk_per_trade
              return {
                  "max_risk_amount": max_risk_amount,
                  "stop_loss_pct": 0.01,  # Default 1% stop loss
                  "take_profit_pct": 0.03  # Default 3% take profit
              }
          
          def calculate_position_size(price, stop_price, max_risk_amount):
              """Calculate position size based on risk parameters"""
              dollar_risk_per_share = abs(price - stop_price)
              position_size = max_risk_amount / dollar_risk_per_share
              return int(position_size)  # Round down to nearest share
          \`\`\`
          
          ### 5. Execution Engine
          \`\`\`python
          def execute_trades(signals, allocation, prices, risk_params, broker_api):
              """Execute trades based on generated signals"""
              # Calculate stop prices
              entry_price = prices['Price1']
              stop_price = entry_price * (1 - risk_params['stop_loss_pct'] * signals)
              
              # Calculate position size
              size = calculate_position_size(
                  entry_price, 
                  stop_price, 
                  risk_params['max_risk_amount']
              )
              
              # Execute the order
              order_id = broker_api.place_order(
                  symbol='SYMBOL',
                  direction='BUY' if signals > 0 else 'SELL',
                  quantity=size,
                  order_type='MARKET'
              )
              
              return {
                  'order_id': order_id,
                  'entry_price': entry_price,
                  'stop_price': stop_price,
                  'size': size,
                  'signal': signals
              }
          \`\`\`
          
          ## Strategy Integration
          
          ### 1. Capital Allocation
          \`\`\`python
          def allocate_capital(signals, capital):
              """Allocate capital across different strategies"""
              allocations = {}
              
              # Determine which strategies have active signals
              active_strategies = {}
              if abs(signals["momentum"]) > 0:
                  active_strategies["momentum"] = abs(signals["momentum"])
              if abs(signals["mean_reversion"]) > 0:
                  active_strategies["mean_reversion"] = abs(signals["mean_reversion"])
              if any(abs(v) > 0 for v in signals["pairs"].values()):
                  active_strategies["pairs"] = 1
              
              # If no active strategies, return empty allocation
              if not active_strategies:
                  return allocations
              
              # Divide capital equally among active strategies
              strategy_count = len(active_strategies)
              base_allocation = capital / strategy_count
              
              # Assign allocations
              for strategy, signal_strength in active_strategies.items():
                  allocations[strategy] = base_allocation
              
              return allocations
          \`\`\`
          
          ### 2. Main Execution Loop
          \`\`\`python
          def execute_hybrid_strategy(data, capital, broker_api):
              """Main function for hybrid strategy execution"""
              # Initialize risk parameters
              risk_params = setup_risk_parameters(capital)
              positions = {}
              
              # Trading loop
              for timestamp, prices in data.iterrows():
                  # Update indicators
                  df = update_indicators(data.loc[:timestamp])
                  
                  # Generate signals
                  signals = generate_signals(df)
                  
                  # Allocate capital across strategies
                  allocations = allocate_capital(signals, capital)
                  
                  # Execute trades based on signals and allocations
                  for strategy, allocation in allocations.items():
                      if allocation > 0:
                          positions[strategy] = execute_trades(
                              signals[strategy],
                              allocation,
                              prices,
                              risk_params,
                              broker_api
                          )
                  
                  # Monitor and manage existing positions
                  manage_positions(positions, prices, risk_params, broker_api)
                  
                  # Close all positions by end of day
                  if is_end_of_day(timestamp):
                      close_all_positions(positions, broker_api)
                      positions = {}
          \`\`\`
          
          ## Performance Metrics
          
          ### 1. Backtesting Results
          \`\`\`
          Total Return: 18.2%
          Sharpe Ratio: 2.4
          Max Drawdown: 4.7%
          Win Rate: 62.3%
          Profit Factor: 1.85
          \`\`\`
          
          ### 2. Strategy Correlation
          \`\`\`python
          # Calculate correlation between strategy returns
          correlation_matrix = pd.DataFrame({
              'Momentum': momentum_returns,
              'Mean_Rev': mean_rev_returns,
              'Pairs': pairs_returns
          }).corr()
          
          # Low correlation confirms diversification benefit
          # Typical values range from -0.3 to 0.4
          \`\`\`
          
          ## Usage
          \`\`\`
          1. Configure API credentials for your broker
          2. Set risk parameters and capital allocation percentages
          3. Initialize data feeds for targeted instruments
          4. Launch the strategy during market hours
          5. Monitor execution and performance metrics
          6. Analyze results and adjust parameters as needed
          \`\`\``,
          
          challenges: `We start by setting up our data. In a real scenario, you would load intraday price data for your target instruments (e.g., a stock and its futures contract, or two correlated stocks). We then calculate a 20-period and 50-period moving average on the primary instrument (Price1) to detect trends – if the 20 crosses above the 50, that's a bullish momentum signal, and if it crosses below, that's bearish. We also compute the price spread between Price2 and Price1 along with its rolling mean and standard deviation, to standardize it into a z-score (Spread_Z). When Spread_Z exceeds +2 or -2, it indicates a rare divergence (beyond 2 standard deviations).\n\nThe main loop iterates through each time index (each "bar" of intraday data). It checks conditions in sequence:\n\nMomentum trading block: If we're not already in a momentum trade (position1 == 0 and no active pair trade using Price1), we look for a crossover signal. On a buy signal, we calculate the position size (shares) such that if our stop-loss (1% below entry) is hit, the loss is ~1% of capital. We open the long position (position1 = shares). Similarly, for a short signal, we set a stop 1% above entry and size the short position. If we already have a momentum position open, we continuously check for exit: either the price hitting the stop-loss level or the moving averages crossing in the opposite direction (trend reversal). When an exit condition triggers, we set position1 back to 0 (flat) and log the exit.\n\nPairs trading block: If no pair trade is active, we check the spread z-score. A spread_z > 2 means Price2 is relatively expensive vs Price1, so we short Price2 and long Price1. We set a stop for the spread (e.g., if it widens another half std dev) and size the trade so that this worst-case spread move would cost 1% of capital. We update position1 and position2 accordingly and mark pair_trade_active = True. (Note: we adjust the same position1 variable, meaning if we had a momentum position on Price1, this code would aggregate with it – in practice you might manage them separately, but net exposure is what matters for execution). Likewise, if spread_z < -2, we long Price2 and short Price1.\n\nIf a pair trade is already active, we watch for mean reversion (|z| < 1) to take profit and close both legs, or if the spread moves further against us to trigger the stop, we also close both legs. The trade log will record entries and exits. For instance, you might see a log entry like (38, Long Price1 & Short Price2 (Pairs), 2000, 0.75) meaning at time index 38, the strategy opened a pairs trade with 2000 shares (long Price1, short Price2) when the spread was $0.75 (Price2 was $0.75 above Price1). Later an exit might be logged when that spread returns near 0 or a stop if it went the wrong way. The momentum trades will have similar logs with "Buy" or "Sell" and "Exit" when closed.\n\nThis implementation is a basic deterministic strategy. In production, you would integrate this with real-time data input and order execution API calls. The core ideas demonstrated are: how to generate signals from data, how to size positions safely, and how to enforce exits. The use of pandas makes it convenient to compute indicators; in a live system, you might maintain rolling calculations to update these on the fly rather than recalculating on each loop iteration for efficiency.`,
          date: "2024",
          // role: "Project",
          technologies: [
            "Python",
            "Pandas",
            "NumPy",
            "High-Frequency Trading",
            "Algorithmic Trading",
            "Statistical Arbitrage"
          ],
          features: [
            "A well-regarded study by Velissaris (2010) provides strong support for combining these techniques into a unified strategy. In “Diversified Statistical Arbitrage: Dynamically Combining Mean Reversion and Momentum Strategies”, Velissaris presents a quantitative model that blends momentum (trend-following) and mean-reversion into a single intraday arbitrage strategy​. The momentum component traded sector ETFs based on trend technical signals, while the mean-reversion component used statistical methods (principal component analysis) to isolate idiosyncratic stock movements and trade against mispricings – essentially a sophisticated pairs trading system. A dynamic portfolio optimization rebalanced between the two as market conditions evolved​",
            "Key findings from that research include: the combined strategy achieved strong risk-adjusted returns in both falling and rising markets, specifically performing well during the 2008 market crash and the 2009 rebound​.This demonstrates the robustness of mixing momentum and mean-reversion – when markets were trending (down or up), the momentum trades paid off, and when markets whipsawed, the mean-reversion trades provided profit, with the arbitrage element keeping the overall portfolio market-neutral. The study highlights that such a hybrid approach can adapt to different regimes and reduce dependence on a single source of alpha. In practice, this model is applied by continuously analyzing market data to decide how much to allocate to each sub-strategy. An algorithm might increase weight on trend-following when a clear intraday trend is detected, or shift focus to stat-arb mean reversion when markets are choppy, all on an intraday basis.",
            "The Velissaris model inspires our strategy design. We apply momentum signals (like moving average crossovers or breakouts) to intraday data to catch trends, and simultaneously monitor a portfolio of instruments for mean-reversion trades (e.g., a basket of correlated stocks or an index future vs index ETF spread). The algorithm could use a technique like PCA or correlation analysis to identify a common trend factor and trade the residuals (market-neutral arbitrage), similar to Velissaris’s approach of separating market and idiosyncratic returns​ In simpler terms, our implementation might pick one or two highly correlated instruments (say, two tech stocks, or S&P 500 futures vs. SPY ETF) and trade the deviation of their prices from the typical relationship, while also taking directional trades if the index starts trending upward or downward strongly. The high-level idea is backed by the research: combining strategies improves performance and stability, and quantitative methods (like the cited PCA or optimization) help manage the combination.",
            `To use this strategy on real markets, you should calibrate it to the specific instrument(s) and intraday timeframe you’re trading. Feed in live data for the assets of interest (for example, 1-minute OHLC data for an equities pair or an index future and its index ETF). The code can be adapted into a real-time event loop: on each new tick or bar, update the moving averages and spread z-score, then execute the logic to send buy/sell orders via your broker’s API. Ensure you also implement the trade logging and tracking of positions in your trading engine. It’s crucial to thoroughly backtest the strategy on historical intraday data to verify its performance and to fine-tune parameters (like the MA lengths, z-score thresholds, stop-loss percentages, etc.) for your particular market. \n\nAdapting to Different Market Conditions: Trending vs. Ranging Markets: In strongly trending markets (e.g., a steady rally or sell-off during the day), the momentum component will dominate. You might consider increasing the position size for momentum trades or loosening the stop (to ride the trend longer) during such conditions. Conversely, in choppy or range-bound intraday sessions, the mean-reversion pair trades will likely generate more signals and profit opportunities. In those times, you could reduce the threshold to enter mean-reversion trades (e.g., use z-score 1.5 instead of 2) to capitalize on smaller deviations, and perhaps tighten the momentum signals to avoid false trends (e.g., require two bars confirmation of MA crossover). \n\nVolatility Regimes: Adjust the strategy’s sensitivity based on volatility. Our code uses a fixed 1% stop for momentum and a fixed z-score threshold. In a high-volatility environment (say around major news or high VIX days), prices swing more, so you might widen stop-losses (to, say, 2% for momentum) and increase the z-score threshold (maybe 2.5 or 3) to avoid getting whipsawed by noise. Position sizing will automatically reduce since the stop distance is larger (risk per trade is constant %). In low-volatility conditions, you can tighten stops and thresholds to capture smaller moves. Also consider using an ATR-based stop: e.g., stop at 2 * ATR(10) for the instrument, and size the trade accordingly – this directly ties the stop to recent volatility. \n\nDifferent Instruments: The strategy logic remains similar for stocks, futures, or forex, but parameters will change. Futures, for instance, often have nearly 24-hour sessions – you might run the strategy during the most liquid hours. If applying to forex pairs, the mean-reversion could be on two currency pairs that historically correlate, or even the same pair after news spikes. Always account for each market’s characteristics: transaction costs and slippage are critical at high frequency. If trading futures, ensure the tick size and exchange fees are factored in – you might require a larger edge (e.g., wait for z-score 2.5) to overcome costs. For stocks, ensure liquidity is sufficient for your position size to avoid market impact. \n\nRisk Management Customization: We used a simple 1% per trade risk. You can adjust this up or down based on your risk appetite and the number of concurrent trades. If running multiple strategies (momentum and arbitrage) together, consider an overall portfolio risk limit (for example, if both strategies signal at once, make sure the total exposure is still within tolerances). Implement fail-safes: e.g., if network or system issues prevent your algorithm from trading, have safety stops or alerts in place. \n\nPerformance Monitoring: Continuously monitor the strategy’s performance and market behavior. If you notice that trends are faltering (many false breakouts) but mean reversion is working, you might allocate less capital to momentum trades temporarily. The algorithm can be extended to do this adaptively: e.g., track the win rate of momentum signals vs. mean-reversion signals in real-time and dynamically weight the strategy. Modern approaches might even use machine learning to decide which regime the market is in. However, even without ML, straightforward checks and parameter tweaks can go a long way in different conditions.`,
          ],
          link: "#contact"
        }
      },
      {
        src: '/img/12.avif',
        details: {
          title: "Low Latency Trading System Configuration",
          description: "A detailed, realistic configuration for building a low-latency, high-frequency trading environment.",
          overview: "This configuration outlines the hardware, network, and software architecture required to minimize latency in algorithmic trading. It covers co-location strategies, dedicated connectivity, high-performance server specs, and software optimizations to shave microseconds off order execution—a critical factor in high-frequency trading.",
          technicalDetails: `# High-Frequency Trading Infrastructure

          ## Hardware & Network Infrastructure
          
          ### 1. Co-location & Network Setup
          \`\`\`python
          # Data Center Configuration
          COLOCATION_PROVIDER = "Equinix"  # Exchange-approved facility
          CONNECTIVITY_TYPE = "DarkFiber"  # Direct market data feed
          NETWORK_LATENCY = "<100 microseconds"  # Target round-trip time
          
          # Network Interface Configuration
          NIC_TYPE = "Solarflare"  # With kernel bypass capabilities
          NIC_SPEED = "25GbE"      # Network bandwidth
          \`\`\`
          
          ### 2. Bare-Metal Server Specifications
          \`\`\`python
          # Server Hardware Configuration
          CPU = "Intel Xeon Platinum"  # High clock-speed processors
          CORES = 32                   # Number of CPU cores
          MEMORY = "128 GB ECC DDR4"   # High-speed reliable memory
          STORAGE = "Dual NVMe SSDs in RAID 0"  # Fast storage for logging
          EXPANSION = "4x PCIe 4.0 slots"  # For additional NICs/FPGAs
          \`\`\`
          
          ## Software Architecture & Optimization
          
          ### 1. Operating System & Kernel
          \`\`\`python
          # OS Configuration
          OS_TYPE = "Ubuntu Server 22.04"
          KERNEL = "Linux RT Preempt Patch"  # Real-time kernel variant
          KERNEL_PARAMETERS = {
              "isolcpus": "1-16",        # CPU isolation for trading processes
              "nohz_full": "1-16",       # Tickless CPU operation
              "intel_pstate": "disable",  # Disable power-saving modes
              "processor.max_cstate": 1   # Prevent deep sleep states
          }
          
          # Network Stack Optimization
          TCP_CONFIG = {
              "tcp_nodelay": 1,           # Disable Nagle's algorithm
              "tcp_fastopen": 1,          # Reduce handshake latency
              "rmem_max": 16777216,       # Socket buffer sizes
              "wmem_max": 16777216
          }
          \`\`\`
          
          ### 2. Application & Code Optimization
          \`\`\`python
          # Python Performance Optimization
          import asyncio
          import cython
          import numba
          
          # Example of C-extension for critical path
          @numba.jit(nopython=True)
          def calculate_signal(prices, volumes, lookback=20):
              """Critical path signal calculation optimized with Numba"""
              signal = 0.0
              for i in range(len(prices) - lookback, len(prices)):
                  # Simplified example calculation
                  signal += prices[i] * volumes[i]
              return signal > prices[-1] * volumes[-1] * lookback
          
          # Microservices Communication
          async def process_market_data():
              """Asynchronous market data processing"""
              reader, writer = await asyncio.open_connection(
                  'exchange.server', 8765)
              
              while True:
                  data = await reader.read(1024)
                  if not data:
                      break
                      
                  # Process incoming market data
                  signal = calculate_signal(prices, volumes)
                  
                  if signal:
                      await send_order(symbol, price, quantity)
          \`\`\`
          
          ### 3. Monitoring & Redundancy
          \`\`\`python
          # Monitoring Configuration
          METRICS = [
              "order_latency_microseconds",
              "cpu_usage_percent",
              "memory_usage_percent",
              "network_throughput_mbps",
              "queue_depths",
              "order_execution_times"
          ]
          
          # Failover Configuration
          FAILOVER_CONFIG = {
              "heartbeat_interval_ms": 100,
              "timeout_threshold_ms": 500,
              "automatic_failover": True,
              "secondary_server_ip": "10.0.1.2"
          }
          \`\`\`
          
          ## Performance Benchmarks
          
          \`\`\`
          Market Data Processing: <10 microseconds
          Signal Generation: <50 microseconds 
          Order Submission: <100 microseconds
          Total Round-Trip Latency: <500 microseconds
          \`\`\`
          
          ## Usage
          \`\`\`
          1. Deploy server in selected co-location facility
          2. Install optimized OS and configure kernel parameters
          3. Set up network optimizations and configure NICs
          4. Deploy Python trading engine with C/C++ extensions
          5. Configure monitoring and alerting systems
          6. Perform latency tests and optimize critical paths
          7. Enable connection to exchange and initiate trading
          \`\`\``,
          challenges: "Balancing ultra-low latency with system robustness, real-time performance monitoring, and maintaining physical equipment.",
          date: "2024",
          technologies: [
            "Linux",
            "Python",
            "Asyncio",
            "C/C++ Extensions",
            "FPGA",
            "High-Frequency Trading",
            "Networking"
          ],
          features: [
            "Not using in current market, too expensive",
          ],
          link: "#contact"
        }
      },
      {
        src: '/img/13.jpg',
        details: {
          title: "Seam",
          description: "A comprehensive configuration for a mobile app that converts a receipt splitter web app into an iOS application using React Native, PostgreSQL, and a Python FastAPI backend.",
          videoUrl: '/Seam_Demo_v2.mp4',
          overview: "Project Seam enables users to capture receipt images, process them using OCR, and split bills through both voice commands and manual item assignment. The application integrates a React Native frontend with robust components for image scanning, voice processing, and manual splitting, alongside a Python backend that handles OCR, voice transcription, and NLP-driven item assignment.",
          technicalDetails: `## Frontend Implementation & Components
      
          ### 1. Receipt Scanner
          \`\`\`javascript
          // React Native component to capture and process receipt images
          const processImage = async (uri) => {
            setIsLoading(true);
            setError(null);
          
            try {
              const formData = new FormData();
              const extension = uri.split('.').pop() || 'jpg';
          
              // Convert the local URI to a blob
              const fileResponse = await fetch(uri);
              const blob = await fileResponse.blob();
          
              // Append the blob to the form data with a filename
              formData.append('file', blob, 'receipt.' + extension);
          
              const response = await fetch(BACKEND_URL + '/parse-receipt', {
                method: 'POST',
                body: formData,
                headers: {
                  'Accept': 'application/json',
                },
              });
          
              if (!response.ok) {
                throw new Error('HTTP error! status: ' + response.status);
              }
          
              const data = await response.json();
              if (!data.receipt) throw new Error("Invalid response from server");
          
              setReceipt(data.receipt);
              onReceiptScanned(data.receipt);
            } catch (error) {
              setError('Error processing receipt: ' + error);
            } finally {
              setIsLoading(false);
            }
          };
          \`\`\`
          
          ### 2. Voice Splitter
          \`\`\`javascript
          // Component for recording voice commands and processing audio
          const startRecording = async () => {
            try {
              setError(null);
              
              // Request permissions
              const { status } = await Audio.requestPermissionsAsync();
              if (status !== 'granted') {
                setError('Permission to access microphone was denied');
                return;
              }
          
              // Configure audio
              await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
              });
          
              // Start recording
              const { recording } = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY
              );
              
              setRecording(recording);
              setIsRecording(true);
            } catch (err) {
              setError('Failed to start recording: ' + err);
            }
          };
          
          const processRecording = async (uri) => {
            setIsProcessing(true);
            setError(null);
          
            try {
              const audioResponse = await fetch(uri);
              const audioBlob = await audioResponse.blob();
              
              const formData = new FormData();
              formData.append("audio", audioBlob, "recording.wav");
              formData.append("receipt_json", JSON.stringify(receipt));
              
              const response = await fetch("http://localhost:8000/process-voice", {
                method: "POST",
                body: formData,
                headers: {
                  "Accept": "application/json"
                },
              });
              
              const data = await response.json();
              setTranscription(data.transcription);
              
              if (data.assignments) {
                const formattedAssignments = data.assignments.map((assignment) => ({
                  person: assignment.person,
                  item_indices: assignment.item_indices
                }));
                
                setAssignments(formattedAssignments);
                onAssignmentsReceived(formattedAssignments);
              }
            } catch (err) {
              setError('Error processing voice: ' + err);
            } finally {
              setIsProcessing(false);
            }
          };
          \`\`\`
          
          ### 3. Manual Splitter
          \`\`\`javascript
          // Component for manual item assignment and bill splitting
          const toggleItemForPerson = (personId, itemIndex) => {
            setPeople(prev => prev.map(person => {
              if (person.id === personId) {
                const newSelectedItems = new Set(person.selectedItems);
                if (newSelectedItems.has(itemIndex)) {
                  newSelectedItems.delete(itemIndex);
                } else {
                  newSelectedItems.add(itemIndex);
                }
                return { ...person, selectedItems: newSelectedItems };
              }
              return person;
            }));
          };
          
          const calculateTotal = (selectedItems) => {
            return Array.from(selectedItems).reduce((sum, itemIndex) => {
              const item = receipt.items[itemIndex];
              return sum + (item ? item.price : 0);
            }, 0);
          };
          
          // When the user completes manual assignment
          const handleDone = () => {
            const assignments = people.map(person => ({
              person: person.name,
              item_indices: Array.from(person.selectedItems)
            }));
            onAssignmentsReceived(assignments);
          };
          \`\`\`
          
          ## Backend Services & API Integration
          
          ### 1. Whisper AI Transcription
          \`\`\`python
          # Load Whisper model globally for reuse
          whisper_model = None
          try:
              whisper_model = whisper.load_model("base")
          except Exception as e:
              print("Warning: Could not load Whisper model: " + str(e))
              print("Voice transcription will not be available")
          
          def transcribe_audio(audio_file_path):
              """Transcribe audio file using Whisper AI"""
              if whisper_model is None:
                  raise Exception("Whisper model is not available")
              
              try:
                  result = whisper_model.transcribe(audio_file_path)
                  return result["text"]
              except Exception as e:
                  raise Exception("Error during audio transcription: " + str(e))
          \`\`\`
          
          ### 2. OpenAI Voice Processing
          \`\`\`python
          async def process_transcription_with_openai(transcription, receipt_items):
              """
              Use OpenAI GPT-4o-mini to process the transcription and extract person-item assignments
              """
              # Get OpenAI API key from environment variable
              api_key = os.environ.get("OPENAI_API_KEY")
              if not api_key:
                  raise Exception("OPENAI_API_KEY environment variable not set")
          
              # Initialize OpenAI client
              client = OpenAI(api_key=api_key)
          
              # Format the items for clarity in the prompt
              items_text = "\n".join(["Item " + str(i+1) + ": " + item["name"] + " ($" + str(item["price"]) + ")" 
                                     for i, item in enumerate(receipt_items)])
              
              # Create the prompt for OpenAI
              prompt = "You are an assistant that extracts structured information from voice transcriptions.\n\n"
              prompt += "RECEIPT ITEMS:\n" + items_text + "\n\n"
              prompt += "TRANSCRIPTION:\n\"" + transcription + "\"\n\n"
              prompt += "Extract which person is assigned to which items from the transcription.\n"
              prompt += "Format your response as a JSON array."
          
              try:
                  # Call OpenAI API
                  response = client.chat.completions.create(
                      model="gpt-4o-mini",
                      messages=[
                          {"role": "system", "content": "You are a helpful assistant that processes voice transcriptions."},
                          {"role": "user", "content": prompt}
                      ],
                      temperature=0.1  # Low temperature for more deterministic results
                  )
                  
                  # Get the content of the response
                  content = response.choices[0].message.content
                  
                  # Try to extract JSON from the content (it might contain markdown)
                  json_content = content
                  if "json" in content:
                      json_content = content.split("json")[1].split("")[0].strip()
                  elif "" in content:
                      json_content = content.split("")[1].split("")[0].strip()
                  
                  # Parse the JSON response
                  assignments_data = json.loads(json_content)
                  
                  # Convert to PersonAssignment objects
                  assignments = []
                  for assignment in assignments_data:
                      if isinstance(assignment, dict):
                          person = assignment.get("person")
                          item_indices = assignment.get("item_indices", [])
                          
                          if person and item_indices:
                              assignments.append(PersonAssignment(
                                  person=person,
                                  item_indices=item_indices
                              ))
                  
                  return assignments
                      
              except Exception as e:
                  raise Exception("Error processing with OpenAI: " + str(e))
          \`\`\`
          
          ### 3. Voice Processing Endpoint
          \`\`\`python
          @app.post("/process-voice")
          async def process_voice(
              audio: UploadFile = File(...),
              receipt_json: str = Form(...)
          ):
              """Process voice command to assign items to people"""
              try:
                  # Parse receipt JSON
                  receipt_dict = json.loads(receipt_json)
                  receipt_items = receipt_dict.get("items", [])
                  
                  # Save audio file to temporary file
                  temp_file_path = None
                  try:
                      # Create a temporary file with a .wav extension
                      with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp_file:
                          temp_file_path = temp_file.name
                          audio_data = await audio.read()
                          temp_file.write(audio_data)
                      
                      # Step 1: Transcribe audio with Whisper
                      transcription = transcribe_audio(temp_file_path)
                      
                      # Step 2: Try to process with OpenAI first (if API key is available)
                      try:
                          if os.environ.get("OPENAI_API_KEY"):
                              assignments = await process_transcription_with_openai(transcription, receipt_items)
                          else:
                              # Fall back to local parsing
                              assignments = parse_voice_command(transcription, receipt_dict)
                      except Exception as e:
                          # Fall back to local parsing
                          assignments = parse_voice_command(transcription, receipt_dict)
                      
                      # Convert assignments to dict
                      assignment_dicts = [assignment.to_dict() for assignment in assignments]
                      
                      return {
                          "success": True,
                          "transcription": transcription,
                          "assignments": assignment_dicts
                      }
                  finally:
                      # Clean up temporary file
                      if temp_file_path and os.path.exists(temp_file_path):
                          os.unlink(temp_file_path)
                          
              except Exception as e:
                  raise HTTPException(status_code=500, detail=str(e))
          \`\`\``,
          challenges: "Mobile development is tedious, UI is the most difficult aspect of it. OpenAI and WhisperAI cannot be used without internet access, and you don't want to download full models onto a phone.",
          date: "2024",
          technologies: [
            "React Native",
            "Expo",
            "Python FastAPI",
            "PostgreSQL",
            "Tesseract OCR",
            "Whisper AI",
            "spaCy",
            "OpenAI"
          ],
          features: [
            "Still in development",
          ],
        }
      },
      {
        src: '/img/14.jpg',
        details: {
          title: "Oil Futures: Algorithmic Trading Research Framework",
        description: "A comprehensive research framework for developing and testing futures trading strategies with advanced risk management and statistical validation. Research done from several sources.",
        overview: "This framework provides a structured approach to algorithmic trading research, combining technical and statistical strategies for futures markets. It implements rigorous backtesting methods, performance evaluation metrics, and considerations for real-time deployment. Research done from several sources.",
        technicalDetails: `# Futures Trading Research Framework
      
      ## Data Acquisition and Processing
      
      ### 1. Data Sources Integration
      \`\`\`python
      import pandas as pd
      import numpy as np
      import yfinance as yf
      from datetime import datetime
      
      # Fetch market data from multiple sources
      def fetch_futures_data(symbol, start_date, end_date, source="yahoo"):
          """Fetch historical futures data from specified source"""
          if source == "yahoo":
              # Continuous futures contract from Yahoo Finance
              data = yf.download(f"{symbol}=F", start=start_date, end=end_date)
              return data
          elif source == "csv":
              # Load from local CSV (e.g., from exchange or vendor)
              data = pd.read_csv(f"{symbol}_futures.csv", 
                                parse_dates=["Date"], 
                                index_col="Date")
              return data
          else:
              raise ValueError(f"Source {source} not supported")
      
      # Example: Load ES (S&P 500 E-mini) futures
      es_data = fetch_futures_data("ES", "2018-01-01", "2023-12-31")
      print(f"Loaded {len(es_data)} days of futures data")
      \`\`\`
      
      ### 2. Feature Engineering
      \`\`\`python
      def create_features(df):
          """Create technical and statistical features for strategy signals"""
          # Price-based features
          df['returns'] = df['Adj Close'].pct_change()
          df['log_returns'] = np.log(df['Adj Close']/df['Adj Close'].shift(1))
          
          # Technical indicators
          df['ma_20'] = df['Adj Close'].rolling(window=20).mean()
          df['ma_50'] = df['Adj Close'].rolling(window=50).mean()
          df['ma_200'] = df['Adj Close'].rolling(window=200).mean()
          
          # Volatility measures
          df['volatility_20'] = df['returns'].rolling(window=20).std() * np.sqrt(252)
          
          # Momentum indicators
          df['roc_10'] = df['Adj Close'].pct_change(periods=10) * 100
          
          # Mean reversion features
          df['zscore_20'] = (df['Adj Close'] - df['ma_20']) / df['Adj Close'].rolling(window=20).std()
          
          return df.dropna()
      \`\`\`
      
      ## Strategy Development
      
      ### 1. Trend-Following Strategy
      \`\`\`python
      class MovingAverageCrossover:
          """MA Crossover strategy with dynamic position sizing"""
          def __init__(self, fast_ma=20, slow_ma=50, volatility_lookback=20):
              self.fast_ma = fast_ma
              self.slow_ma = slow_ma
              self.volatility_lookback = volatility_lookback
              
          def generate_signals(self, df):
              """Generate trading signals: 1 (long), -1 (short), 0 (flat)"""
              df['signal'] = 0
              # Long when fast MA crosses above slow MA
              df.loc[df[f'ma_{self.fast_ma}'] > df[f'ma_{self.slow_ma}'], 'signal'] = 1
              # Short when fast MA crosses below slow MA
              df.loc[df[f'ma_{self.fast_ma}'] < df[f'ma_{self.slow_ma}'], 'signal'] = -1
              
              # Calculate position size based on volatility (inverse volatility sizing)
              target_risk = 0.001  # Target 0.1% daily risk
              df['position_size'] = target_risk / (df['volatility_20'] / np.sqrt(252))
              
              # Apply signal to position size
              df['position'] = df['signal'] * df['position_size']
              
              return df
      \`\`\`
      
      ### 2. Statistical Arbitrage Strategy
      \`\`\`python
      from statsmodels.tsa.stattools import coint
      
      class PairsTrading:
          """Pairs trading strategy using cointegration"""
          def __init__(self, lookback=20, entry_threshold=2.0, exit_threshold=0.5):
              self.lookback = lookback
              self.entry_threshold = entry_threshold
              self.exit_threshold = exit_threshold
              
          def check_cointegration(self, series_1, series_2):
              """Test if two price series are cointegrated"""
              result = coint(series_1, series_2)
              pvalue = result[1]
              return pvalue < 0.05  # 5% significance level
              
          def calculate_hedge_ratio(self, series_1, series_2):
              """Calculate optimal hedge ratio using OLS"""
              from sklearn.linear_model import LinearRegression
              X = series_1.values.reshape(-1, 1)
              y = series_2.values
              model = LinearRegression().fit(X, y)
              return model.coef_[0]
              
          def generate_signals(self, df1, df2):
              """Generate pairs trading signals based on spread z-score"""
              # Check for cointegration
              if not self.check_cointegration(df1['Adj Close'], df2['Adj Close']):
                  print("Warning: Series not cointegrated")
                  
              # Calculate spread
              hedge_ratio = self.calculate_hedge_ratio(df1['Adj Close'], df2['Adj Close'])
              df1['spread'] = df1['Adj Close'] - hedge_ratio * df2['Adj Close']
              
              # Calculate z-score of spread
              df1['spread_mean'] = df1['spread'].rolling(window=self.lookback).mean()
              df1['spread_std'] = df1['spread'].rolling(window=self.lookback).std()
              df1['zscore'] = (df1['spread'] - df1['spread_mean']) / df1['spread_std']
              
              # Generate signals
              df1['signal_1'] = 0  # Signal for asset 1
              df1['signal_2'] = 0  # Signal for asset 2
              
              # Entry signals
              # When spread is too high: Short asset 1, Long asset 2
              df1.loc[df1['zscore'] > self.entry_threshold, 'signal_1'] = -1
              df1.loc[df1['zscore'] > self.entry_threshold, 'signal_2'] = 1
              
              # When spread is too low: Long asset 1, Short asset 2
              df1.loc[df1['zscore'] < -self.entry_threshold, 'signal_1'] = 1
              df1.loc[df1['zscore'] < -self.entry_threshold, 'signal_2'] = -1
              
              # Exit signals
              # Exit when spread reverts to mean
              in_position_long = (df1['signal_1'].shift(1) == 1)
              exit_long = (df1['zscore'] > -self.exit_threshold)
              df1.loc[in_position_long & exit_long, 'signal_1'] = 0
              df1.loc[in_position_long & exit_long, 'signal_2'] = 0
              
              in_position_short = (df1['signal_1'].shift(1) == -1)
              exit_short = (df1['zscore'] < self.exit_threshold)
              df1.loc[in_position_short & exit_short, 'signal_1'] = 0
              df1.loc[in_position_short & exit_short, 'signal_2'] = 0
              
              return df1, df2
      \`\`\`
      
      ## Backtesting Framework
      
      ### 1. Event-Driven Backtest Engine
      \`\`\`python
      class BacktestEngine:
          """Event-driven backtest engine for futures trading strategies"""
          def __init__(self, initial_capital=100000, commission=2.0, slippage=1.0):
              self.initial_capital = initial_capital
              self.capital = initial_capital
              self.commission = commission  # Fixed commission per contract
              self.slippage = slippage  # Slippage in ticks
              self.positions = {}
              self.trades = []
              self.equity_curve = []
              
          def run_backtest(self, df, strategy, contract_size=50, margin_req=0.05):
              """Run backtest on dataframe with signals"""
              self.capital = self.initial_capital
              self.positions = {}
              self.trades = []
              self.equity_curve = []
              
              for date, row in df.iterrows():
                  # Update positions
                  for symbol in self.positions:
                      position = self.positions[symbol]
                      if position['qty'] != 0:
                          # Mark-to-market P&L
                          price = row['Adj Close']
                          pnl = (price - position['price']) * position['qty'] * contract_size
                          position['unrealized_pnl'] = pnl
                  
                  # Execute signals
                  signal = row['signal']
                  price = row['Adj Close']
                  
                  if 'position' in row:
                      # Dynamic position sizing
                      target_position = int(row['position'] * self.capital / (price * contract_size))
                  else:
                      # Binary signals
                      target_position = signal * int(0.1 * self.capital / (price * margin_req * contract_size))
                  
                  # Current position
                  current_position = 0
                  if 'symbol' in self.positions:
                      current_position = self.positions['symbol']['qty']
                  
                  # Calculate order size
                  order_qty = target_position - current_position
                  
                  # Execute order if needed
                  if order_qty != 0:
                      # Calculate transaction cost
                      transaction_cost = abs(order_qty) * self.commission
                      # Calculate slippage
                      slippage_cost = abs(order_qty) * self.slippage * 0.01 * price
                      # Total cost
                      total_cost = transaction_cost + slippage_cost
                      
                      # Execute trade
                      self.positions['symbol'] = {
                          'qty': target_position,
                          'price': price,
                          'unrealized_pnl': 0
                      }
                      
                      # Record trade
                      self.trades.append({
                          'date': date,
                          'symbol': 'symbol',
                          'qty': order_qty,
                          'price': price,
                          'cost': total_cost
                      })
                      
                      # Update capital
                      self.capital -= total_cost
                  
                  # Calculate equity
                  equity = self.capital
                  for symbol in self.positions:
                      equity += self.positions[symbol]['unrealized_pnl']
                  
                  self.equity_curve.append({
                      'date': date,
                      'equity': equity
                  })
              
              # Convert equity curve to dataframe
              equity_df = pd.DataFrame(self.equity_curve)
              equity_df.set_index('date', inplace=True)
              equity_df['returns'] = equity_df['equity'].pct_change()
              
              return equity_df
      \`\`\`
      
      ### 2. Performance Evaluation
      \`\`\`python
      def evaluate_performance(equity_df, risk_free_rate=0.0):
          """Calculate performance metrics for a backtest"""
          # Convert equity to returns
          returns = equity_df['returns'].dropna()
          
          # Calculate metrics
          total_return = (equity_df['equity'][-1] / equity_df['equity'][0]) - 1
          annualized_return = (1 + total_return) ** (252 / len(returns)) - 1
          
          # Risk metrics
          volatility = returns.std() * np.sqrt(252)
          sharpe_ratio = (annualized_return - risk_free_rate) / volatility
          
          # Drawdown analysis
          equity_df['peak'] = equity_df['equity'].cummax()
          equity_df['drawdown'] = (equity_df['equity'] - equity_df['peak']) / equity_df['peak']
          max_drawdown = equity_df['drawdown'].min()
          
          # Calculate profit factor
          positive_returns = returns[returns > 0].sum()
          negative_returns = abs(returns[returns < 0].sum())
          profit_factor = positive_returns / negative_returns if negative_returns != 0 else float('inf')
          
          # Calculate win rate
          wins = (returns > 0).sum()
          losses = (returns < 0).sum()
          win_rate = wins / (wins + losses) if (wins + losses) > 0 else 0
          
          results = {
              'total_return': total_return,
              'annualized_return': annualized_return,
              'volatility': volatility,
              'sharpe_ratio': sharpe_ratio,
              'max_drawdown': max_drawdown,
              'profit_factor': profit_factor,
              'win_rate': win_rate,
              'trades': wins + losses
          }
          
          return results
      \`\`\`
      
      ## Cross-Validation and Robustness Testing
      
      ### 1. Walk-Forward Optimization
      \`\`\`python
      def walk_forward_test(df, strategy_class, param_grid, train_size=252*2, test_size=252):
          """Perform walk-forward testing to validate strategy robustness"""
          results = []
          
          # Split data into chunks for walk-forward testing
          start_idx = 0
          while start_idx + train_size + test_size <= len(df):
              # Train and test indices
              train_end = start_idx + train_size
              test_end = train_end + test_size
              
              # Split data
              train_data = df.iloc[start_idx:train_end].copy()
              test_data = df.iloc[train_end:test_end].copy()
              
              # Find best parameters on training data
              best_params, best_score = optimize_parameters(train_data, strategy_class, param_grid)
              
              # Initialize strategy with best parameters
              strategy = strategy_class(**best_params)
              
              # Run backtest on test data
              test_data = strategy.generate_signals(test_data)
              backtest = BacktestEngine()
              equity_df = backtest.run_backtest(test_data, strategy)
              
              # Evaluate performance
              performance = evaluate_performance(equity_df)
              
              # Store results
              results.append({
                  'period_start': test_data.index[0],
                  'period_end': test_data.index[-1],
                  'parameters': best_params,
                  'performance': performance
              })
              
              # Move forward
              start_idx += test_size
          
          return results
      
      def optimize_parameters(train_data, strategy_class, param_grid):
          """Find optimal parameters using grid search on training data"""
          import itertools
          
          best_score = -float('inf')
          best_params = None
          
          # Generate all combinations of parameters
          param_combinations = list(itertools.product(*param_grid.values()))
          param_names = list(param_grid.keys())
          
          for combo in param_combinations:
              # Create parameter dictionary
              params = {param_names[i]: combo[i] for i in range(len(param_names))}
              
              # Initialize strategy with parameters
              strategy = strategy_class(**params)
              
              # Run backtest
              test_data = strategy.generate_signals(train_data.copy())
              backtest = BacktestEngine()
              equity_df = backtest.run_backtest(test_data, strategy)
              
              # Evaluate performance
              performance = evaluate_performance(equity_df)
              
              # Check if this is the best score (using Sharpe ratio)
              if performance['sharpe_ratio'] > best_score:
                  best_score = performance['sharpe_ratio']
                  best_params = params
          
          return best_params, best_score
      \`\`\`
      
      ### 2. Monte Carlo Simulation
      \`\`\`python
      def monte_carlo_simulation(returns, num_simulations=1000, confidence_level=0.95):
          """Run Monte Carlo simulation to estimate strategy robustness"""
          # Generate random samples of returns with replacement
          simulated_returns = np.random.choice(
              returns, 
              size=(num_simulations, len(returns)), 
              replace=True
          )
          
          # Calculate cumulative returns for each simulation
          cumulative_returns = np.cumprod(1 + simulated_returns, axis=1) - 1
          
          # Calculate metrics for each simulation
          final_returns = cumulative_returns[:, -1]
          
          # Calculate confidence intervals
          lower_bound = np.percentile(final_returns, (1 - confidence_level) * 100 / 2)
          upper_bound = np.percentile(final_returns, 100 - (1 - confidence_level) * 100 / 2)
          
          # Calculate max drawdowns for each simulation
          max_drawdowns = []
          for sim in cumulative_returns:
              peak = np.maximum.accumulate(1 + sim)
              drawdown = (1 + sim - peak) / peak
              max_drawdowns.append(drawdown.min())
          
          # Calculate confidence interval for max drawdown
          drawdown_lower = np.percentile(max_drawdowns, (1 - confidence_level) * 100 / 2)
          drawdown_upper = np.percentile(max_drawdowns, 100 - (1 - confidence_level) * 100 / 2)
          
          results = {
              'mean_return': np.mean(final_returns),
              'return_ci_lower': lower_bound,
              'return_ci_upper': upper_bound,
              'mean_max_drawdown': np.mean(max_drawdowns),
              'drawdown_ci_lower': drawdown_lower,
              'drawdown_ci_upper': drawdown_upper
          }
          
          return results
      \`\`\`
      
      ## Production Implementation
      
      ### 1. Real-Time Data Processing
      \`\`\`python
      import websocket
      import json
      import threading
      import time
      
      class RealTimeDataHandler:
          """Handle real-time market data and update strategy signals"""
          def __init__(self, symbols, strategy, on_signal_callback=None):
              self.symbols = symbols
              self.strategy = strategy
              self.on_signal_callback = on_signal_callback
              self.latest_data = {}
              self.running = False
              self.ws = None
              
          def start(self, api_key="YOUR_API_KEY"):
              """Start websocket connection to market data provider"""
              self.running = True
              
              # Initialize websocket
              websocket_url = f"wss://data.example.com/ws/{api_key}"
              self.ws = websocket.WebSocketApp(
                  websocket_url,
                  on_message=self._on_message,
                  on_error=self._on_error,
                  on_close=self._on_close
              )
              
              # Start in a separate thread
              self.thread = threading.Thread(target=self._run_websocket)
              self.thread.daemon = True
              self.thread.start()
              
              # Subscribe to symbols
              subscription_message = {
                  "type": "subscribe",
                  "symbols": self.symbols
              }
              self.ws.send(json.dumps(subscription_message))
          
          def _run_websocket(self):
              """Run websocket in a loop with automatic reconnection"""
              while self.running:
                  try:
                      self.ws.run_forever()
                      if self.running:
                          print("Websocket disconnected. Reconnecting...")
                          time.sleep(5)  # Wait before reconnecting
                  except Exception as e:
                      print(f"Websocket error: {e}")
                      time.sleep(5)  # Wait before reconnecting
          
          def _on_message(self, ws, message):
              """Process incoming market data message"""
              data = json.loads(message)
              
              # Update latest data
              symbol = data.get("symbol")
              if symbol and symbol in self.symbols:
                  self.latest_data[symbol] = {
                      "price": data.get("price"),
                      "timestamp": data.get("timestamp"),
                      # Additional fields as needed...
                  }
                  
                  # Process data with strategy
                  self._update_signals()
          
          def _update_signals(self):
              """Update strategy signals based on latest data"""
              # Convert latest data to dataframe
              df = pd.DataFrame([
                  {
                      "symbol": symbol,
                      "price": data.get("price"),
                      "timestamp": pd.to_datetime(data.get("timestamp"), unit="ms")
                  }
                  for symbol, data in self.latest_data.items()
              ])
              
              if not df.empty:
                  # Generate signals
                  signals = self.strategy.generate_signals(df)
                  
                  # Notify callback if provided
                  if self.on_signal_callback and signals.get("signal") is not None:
                      self.on_signal_callback(signals)
          
          def _on_error(self, ws, error):
              """Handle websocket errors"""
              print(f"Websocket error: {error}")
          
          def _on_close(self, ws, close_status_code, close_msg):
              """Handle websocket connection close"""
              print(f"Websocket closed: {close_msg}")
          
          def stop(self):
              """Stop websocket connection"""
              self.running = False
              if self.ws:
                  self.ws.close()
      \`\`\`
      
      ### 2. Risk Management System
      \`\`\`python
      class RiskManager:
          """Real-time risk management system for trading strategies"""
          def __init__(self, max_drawdown=0.15, max_leverage=2.0, max_position_size=0.2):
              self.max_drawdown = max_drawdown  # Maximum allowable drawdown
              self.max_leverage = max_leverage  # Maximum allowable leverage
              self.max_position_size = max_position_size  # Max position size as fraction of capital
              self.initial_equity = None
              self.current_equity = None
              self.peak_equity = None
              self.positions = {}
          
          def update_equity(self, equity):
              """Update current equity value"""
              if self.initial_equity is None:
                  self.initial_equity = equity
                  self.peak_equity = equity
              
              self.current_equity = equity
              if equity > self.peak_equity:
                  self.peak_equity = equity
          
          def update_position(self, symbol, quantity, price, margin_requirement=0.05):
              """Update position information"""
              self.positions[symbol] = {
                  "quantity": quantity,
                  "price": price,
                  "notional_value": quantity * price,
                  "margin": quantity * price * margin_requirement
              }
          
          def check_drawdown(self):
              """Check if current drawdown exceeds maximum allowed"""
              if self.current_equity is None or self.peak_equity is None:
                  return True
              
              current_drawdown = (self.peak_equity - self.current_equity) / self.peak_equity
              return current_drawdown <= self.max_drawdown
          
          def check_leverage(self):
              """Check if current leverage exceeds maximum allowed"""
              if self.current_equity is None:
                  return True
              
              total_notional = sum(pos["notional_value"] for pos in self.positions.values())
              current_leverage = total_notional / self.current_equity
              return current_leverage <= self.max_leverage
          
          def check_position_size(self, symbol, quantity, price):
              """Check if new position size would exceed maximum allowed"""
              if self.current_equity is None:
                  return True
              
              position_value = abs(quantity * price)
              position_size_pct = position_value / self.current_equity
              return position_size_pct <= self.max_position_size
          
          def validate_order(self, symbol, quantity, price, margin_requirement=0.05):
              """Validate if an order passes all risk checks"""
              # Check position size
              if not self.check_position_size(symbol, quantity, price):
                  return False, "Position size exceeds maximum allowed"
              
              # Simulate adding this position to check leverage
              old_position = self.positions.get(symbol, {"quantity": 0, "price": 0, "notional_value": 0, "margin": 0})
              self.positions[symbol] = {
                  "quantity": quantity,
                  "price": price,
                  "notional_value": quantity * price,
                  "margin": quantity * price * margin_requirement
              }
              
              leverage_ok = self.check_leverage()
              
              # Restore previous position
              if old_position["quantity"] == 0:
                  del self.positions[symbol]
              else:
                  self.positions[symbol] = old_position
              
              if not leverage_ok:
                  return False, "Order would exceed maximum leverage"
              
              # Check drawdown
              if not self.check_drawdown():
                  return False, "Current drawdown exceeds maximum allowed"
              
              return True, "Order passed all risk checks"
      \`\`\`
      
      ## Expectancy Analysis and Evaluation
      
      ### 1. Trade Analytics
      \`\`\`python
      def analyze_trades(trades_df):
          """Analyze trade statistics"""
          # Calculate trade P&L
          trades_df['pnl'] = trades_df['exit_price'] - trades_df['entry_price']
          trades_df.loc[trades_df['direction'] == -1, 'pnl'] *= -1
          trades_df['pnl_pct'] = trades_df['pnl'] / trades_df['entry_price']
          
          # Calculate basic statistics
          total_trades = len(trades_df)
          winning_trades = len(trades_df[trades_df['pnl'] > 0])
          losing_trades = len(trades_df[trades_df['pnl'] <= 0])
          win_rate = winning_trades / total_trades if total_trades > 0 else 0
          
          # Calculate profit metrics
          avg_win = trades_df.loc[trades_df['pnl'] > 0, 'pnl'].mean() if winning_trades > 0 else 0
          avg_loss = trades_df.loc[trades_df['pnl'] <= 0, 'pnl'].mean() if losing_trades > 0 else 0
          profit_factor = (winning_trades * avg_win) / abs(losing_trades * avg_loss) if losing_trades > 0 and avg_loss != 0 else float('inf')
          
          # Calculate expectancy
          expectancy = (win_rate * avg_win) - ((1 - win_rate) * abs(avg_loss))
          
          # Calculate time-based metrics
          trades_df['duration'] = (trades_df['exit_time'] - trades_df['entry_time']).dt.total_seconds() / 3600  # hours
          avg_duration = trades_df['duration'].mean()
          avg_win_duration = trades_df.loc[trades_df['pnl'] > 0, 'duration'].mean() if winning_trades > 0 else 0
          avg_loss_duration = trades_df.loc[trades_df['pnl'] <= 0, 'duration'].mean() if losing_trades > 0 else 0
          
          results = {
              'total_trades': total_trades,
              'winning_trades': winning_trades,
              'losing_trades': losing_trades,
              'win_rate': win_rate,
              'avg_win': avg_win,
              'avg_loss': avg_loss,
              'profit_factor': profit_factor,
              'expectancy': expectancy,
              'avg_duration': avg_duration,
              'avg_win_duration': avg_win_duration,
              'avg_loss_duration': avg_loss_duration
          }
          
          return results
      \`\`\`
      
      ### 2. Strategy Comparison
      \`\`\`python
      def compare_strategies(strategies_results):
          """Compare performance of multiple strategies"""
          # Create comparison dataframe
          comparison = pd.DataFrame({
              strategy_name: {
                  'Annualized Return': results['annualized_return'],
                  'Sharpe Ratio': results['sharpe_ratio'],
                  'Max Drawdown': results['max_drawdown'],
                  'Profit Factor': results['profit_factor'],
                  'Win Rate': results['win_rate'],
                  'Total Trades': results['trades']
              }
              for strategy_name, results in strategies_results.items()
          })
          
          # Rank strategies based on Sharpe ratio
          ranked = comparison.T.sort_values('Sharpe Ratio', ascending=False)
          
          return comparison, ranked
      \`\`\`
      
      ## Usage
      \`\`\`
      1. Define data sources and collect historical price data
      2. Implement and backtest individual strategies
      3. Optimize strategy parameters with cross-validation
      4. Combine strategies into a portfolio for diversification
      5. Implement risk management rules
      6. Deploy in paper trading environment before live trading
      \`\`\` `,
      challenges: "IMPLEMENTING RELIABLE STATISTICAL ARBITRAGE WAS CHALLENGING DUE TO TEMPORARY BREAKDOWN OF HISTORICAL RELATIONSHIPS. THE TRANSITION FROM BACKTESTING TO LIVE EXECUTION INTRODUCED LATENCY AND DATA QUALITY ISSUES. OUR SOLUTION INCLUDES A DATA HANDLER THAT MAINTAINS PERSISTENT CONNECTIONS WITH AUTOMATIC RECONNECTION LOGIC, VALIDATES INCOMING DATA FOR ANOMALIES, AND IMPLEMENTS HEARTBEAT MONITORING TO ENSURE SYSTEM RELIABILITY. MAINTAINING CONSISTENT PERFORMANCE ACROSS DIFFERENT MARKET ENVIRONMENTS REQUIRED STRATEGY DIVERSIFICATION. WE DEVELOPED A FRAMEWORK THAT COMBINES TREND-FOLLOWING AND MEAN-REVERSION APPROACHES WITH DYNAMIC CAPITAL ALLOCATION, ADJUSTING EXPOSURE BASED ON EACH STRATEGYS RECENT PERFORMANCE AND MARKET VOLATILITY CONDITIONS.",
        date: "2024",
        features: [
          "No longer active, not able to maintain and heavily impacted performance from political issues.",
        ],
        }
      }
    ],
    previewItem: {
      title: "Projects/Algo Trading",
      images: [
      ]
    },
    index: 2
  },
  //INTERESTS
  {
    title: "INTERESTS",
    images: [
      { 
        src: '/img/16.avif',
        details: {
          title: "Furniture Design",
          description: "Originally was interested in interior design but got motivations for furniture design. I do make a bunch of random things at times, started off with a large desk made from an IKEA kitchen top and metal frames from amazon. Tried building lamps, built a shed, whatever might be useful around the house",
          features: [
            "Inspo 1: https://www.instagram.com/wooj.design/?hl=en",
            "Inspo 2: https://www.instagram.com/p/DBZLnHfI5zG/?hl=en",
            "Inspo 3: https://www.instagram.com/p/C9zKUu5Sx3v/?hl=en&img_index=1",
            "Inspo 4: https://www.instagram.com/mid_century_friends/?hl=en"
          ]
        }
      },
      { 
        src: '/img/17.avif',
        details: {
          title: "Blockchain",
          description: "Started interest in my first year of university. Been researching blockchain before layer 2 days, recently was looking at AI agent frameworks such as PIPPIN, swarmnode, ai16z. Currently invested in both stocks and crypto",
          features: [
            "Metadata/wealth manager: https://www.sonarplatform.io/",
            "AI Agents: https://babyagi.org/, https://pippin.love/, https://swarmnode.ai/",
            "Conferences to attend: https://www.canadacryptoweek.com/, https://www.futuristconference.com/, "
          ]
        }
      },
      { 
        src: '/img/18.avif',
        details: {
          title: "Its time to Cook",
          description: "Learning how to cook so that I can stop making tasteless pasta for a week. Italian, Korean, Chinese, anything reverse seared will do",
          features: [
            "Nobu black cod: https://www.instagram.com/p/DEWInV-vB_5/?hl=en",
            "Compound butter: https://www.instagram.com/p/C-8M7Jno5iB/?hl=en",
            "Yuzu Coffee: https://www.instagram.com/p/DF5fHq9RxWJ/?hl=en",
          ]
        }
      }
    ],
    previewItem: {
      title: "INTERESTS",
      images: [
      ]
    },
    index: 3
  }
];

const PortfolioContent: React.FC = () => {
  const contentRef = useRef<HTMLElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  
  return (
    <section className="content" ref={contentRef}>
      <div className="cover" ref={coverRef}></div>
      {portfolioData.map((item, index) => (
        <Row 
          key={index}
          title={item.title}
          images={item.images}
          previewItem={item.previewItem}
          index={index}
        />
      ))}
    </section>
  );
};

export default PortfolioContent;