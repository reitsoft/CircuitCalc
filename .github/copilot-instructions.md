# CircuitCalc - AI Coding Agent Instructions

## Project Overview

CircuitCalc is a web application for scraping electrical component data from online shops and managing customer offers. Users can add webshop URLs, scrape product data (articles, prices, package sizes), and create customized offers with calculated selling prices for customers.

**Tech Stack**: SvelteKit 5, JavaScript (no TypeScript), TailwindCSS, DaisyUI, Vite, Drizzle ORM, SQLite, Puppeteer, Zod

## Architecture

### Core Components

**Frontend (SvelteKit Routes)**
- Dashboard: Metrics (total articles, customers, projects), activity feed
- Webshops page: Add/manage webshop URLs, trigger scraping, view logs
- Articles: Browse, filter, and manage scraped data
- Customers: CRUD operations (name, email, phone, address, company)
- Projects: Link customer + article list, auto-calculate total price, generate offers

**Backend Services**
- Web Scraper: Puppeteer-based service to extract article data from configured webshops
- Calculation Engine: Markup calculation and offer generation
- Database: SQLite with Drizzle ORM for schema management

**Data Models**
- Article: name, manufacturer, purchase_price, package_size, category, scraped_date
- Customer: name, email, phone, address, company_name
- Project: name, customer_id, status, total_price, created_at
- Scrape_Log: webshop_url, scraped_count, error_message, timestamp

### Database Relationships
- Customers → Projects (1:N)
- Projects → Articles (M:N via junction table)

## Key Conventions

### Markup & Pricing
- Calculate selling price: `selling_price = purchase_price * (1 + markup_percentage / 100)`
- Markup percentage: configurable globally (default) and per article category
- Always round final price to 2 decimal places (e.g., 12.49 EUR)

### Webshop Scraping
- Scraping page: text input for webshop URL + manual "Start Scrape" button
- Log all scraping operations: timestamp, URL, articles_found, errors
- Store scrape logs in database for audit trail
- Implement retry logic and error handling for network issues

### UI Components
- Use DaisyUI components throughout (buttons, cards, tables, modals)
- Dashboard shows: total articles count, total customers, active projects, recent scrapes
- Real-time activity feed in sidebar (latest 10 scrapes/project updates)

### Error Handling & Validation
- Validate webshop URLs before scraping (HTTPS, valid domain)
- Handle Puppeteer timeouts gracefully with user-friendly messages
- Log all errors to database and UI notifications









