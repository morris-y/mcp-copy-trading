# MCP 辅助跟单系统

A cryptocurrency trading platform focused on KOL (Key Opinion Leader) tracking and trading strategies with integrated Twitter sentiment analysis.

[查看完整产品需求文档 (PRD)](./PRD.md)

## Overview

MCP is a platform focused on cryptocurrency trading and KOL management. It allows users to track, analyze, and follow the cryptocurrency trading activities of KOLs, with a special focus on investment opportunities in popular coins. Users can combine MCP's Twitter data sentiment analysis capability to make more precise investment decisions.

## Features

- **KOL Management**: Track and analyze KOL wallet addresses and performance metrics
- **Trading Data Analysis**: Detailed token trading information with price charts and transaction details
- **Twitter Sentiment Analysis**: Leverage MCP's Twitter data analysis to enhance decision accuracy
- **Copy Trading Strategies**: Create and manage automated copy trading strategies based on KOL activities
- **Memory-Based Optimization**: Automatically adjust trading parameters based on historical interactions
- **Modern Dark UI**: Exclusive dark mode with high contrast text and teal/aqua accent (#00FF9D)

## Target Users

- Cryptocurrency investors and traders
- Users looking to follow successful KOL trading strategies
- Cryptocurrency market analysts and researchers
- Traders who need sentiment data to assist decision-making

## Technical Stack

### Frontend
- **Framework**: Next.js with React components
- **Language**: TypeScript for type safety
- **UI Components**: Custom components (Button, Card, Input, Tabs) with Lucide icon library
- **Design**: Responsive design supporting different screen sizes

### Data Storage
- Local storage for user preferences (like watch lists)
- Server storage for Memory data and sentiment analysis results
- Pre-set demo data for feature demonstration

### Integrations
- Blockchain explorers (Etherscan/BSCscan)
- MCP Twitter data sentiment analysis API
- Memory system for intelligent strategy adjustments

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone <repository-url>
   cd mcp
   ```

2. Install dependencies
   ```
   npm install
   # or
   yarn install
   ```

3. Run the development server
   ```
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## UI Design

The application follows a minimalist aesthetic with:

- **Dark Background**: With high contrast text for better readability
- **Accent Color**: Teal/aqua (#00FF9D) for interactive elements
- **Button Styles**:
  - Regular buttons: Dark translucent background with subtle borders
  - Active/special buttons: Teal background with white text
  - Hover effect: Slight scaling without color inversion
- **Tab Styling**:
  - Active tabs: Teal background with white text
  - Inactive tabs: Dark background with light gray text
- **Table Styles**:
  - Clear row separators with dark gray borders
  - Hover effects with slightly brighter background color
  - Highlighted selected rows
- **Chart Styles**:
  - Clean candlestick charts
  - Highlighted buy/sell markers

## Implementation Status

- Current implementation is primarily a frontend demo
- Backend APIs are not yet integrated, mostly using mock data
- KOL list uses real wallet addresses

## Pending Backend APIs

- **On-chain Data API**: GMGN or other services providing wallet addresses/latest transactions
- **Chart Data**: Corresponding token sell point charts with TradingView integration
- **Sentiment Analysis**: MCP agent + Twitter API endpoint
- **Memory Storage**: Backend storage solution for MCP agent execution memory data
- **Copy Trading System**: dbot simulator copy trading API and request parameters
