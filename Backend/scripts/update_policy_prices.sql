-- InsurTech - Complete Policy Setup
-- This script creates 15 curated insurance plans (3 per category)
-- Currency: MMK (Myanmar Kyat)
-- Run this in Supabase SQL Editor

-- LIFE INSURANCE (3 plans)
INSERT INTO policies (name, description, base_annual_premium, coverage_amount) 
SELECT 'Term Life Insurance', 'Affordable protection for your family during a specified period', 350000, 50000000
WHERE NOT EXISTS (SELECT 1 FROM policies WHERE name = 'Term Life Insurance');

INSERT INTO policies (name, description, base_annual_premium, coverage_amount) 
SELECT 'Whole Life Insurance', 'Lifetime coverage with cash value growth', 550000, 75000000
WHERE NOT EXISTS (SELECT 1 FROM policies WHERE name = 'Whole Life Insurance');

INSERT INTO policies (name, description, base_annual_premium, coverage_amount) 
SELECT 'Universal Life Insurance', 'Flexible premiums with investment growth potential', 480000, 65000000
WHERE NOT EXISTS (SELECT 1 FROM policies WHERE name = 'Universal Life Insurance');

-- HEALTH INSURANCE (3 plans)
INSERT INTO policies (name, description, base_annual_premium, coverage_amount) 
SELECT 'Health Insurance', 'Comprehensive medical coverage for you and your family', 280000, 30000000
WHERE NOT EXISTS (SELECT 1 FROM policies WHERE name = 'Health Insurance');

INSERT INTO policies (name, description, base_annual_premium, coverage_amount) 
SELECT 'Critical Illness Insurance', 'Lump sum payout for serious diagnoses like cancer or stroke', 420000, 50000000
WHERE NOT EXISTS (SELECT 1 FROM policies WHERE name = 'Critical Illness Insurance');

INSERT INTO policies (name, description, base_annual_premium, coverage_amount) 
SELECT 'Medical Insurance', 'Focus on hospitalization and medical treatment costs', 320000, 40000000
WHERE NOT EXISTS (SELECT 1 FROM policies WHERE name = 'Medical Insurance');

-- AUTO INSURANCE (3 plans)
INSERT INTO policies (name, description, base_annual_premium, coverage_amount) 
SELECT 'Auto Insurance', 'Complete protection for your vehicle against all risks', 180000, 25000000
WHERE NOT EXISTS (SELECT 1 FROM policies WHERE name = 'Auto Insurance');

INSERT INTO policies (name, description, base_annual_premium, coverage_amount) 
SELECT 'Car Insurance', 'Essential coverage for private passenger cars', 200000, 30000000
WHERE NOT EXISTS (SELECT 1 FROM policies WHERE name = 'Car Insurance');

INSERT INTO policies (name, description, base_annual_premium, coverage_amount) 
SELECT 'Motor Insurance', 'Coverage for motorcycles and two-wheelers', 165000, 15000000
WHERE NOT EXISTS (SELECT 1 FROM policies WHERE name = 'Motor Insurance');

-- PROPERTY INSURANCE (3 plans)
INSERT INTO policies (name, description, base_annual_premium, coverage_amount) 
SELECT 'Home Insurance', 'Protect your home and belongings from damage and theft', 250000, 80000000
WHERE NOT EXISTS (SELECT 1 FROM policies WHERE name = 'Home Insurance');

INSERT INTO policies (name, description, base_annual_premium, coverage_amount) 
SELECT 'Property Insurance', 'Commercial and investment property protection', 300000, 99000000
WHERE NOT EXISTS (SELECT 1 FROM policies WHERE name = 'Property Insurance');

INSERT INTO policies (name, description, base_annual_premium, coverage_amount) 
SELECT 'Renters Insurance', 'Affordable protection for tenants and their belongings', 85000, 10000000
WHERE NOT EXISTS (SELECT 1 FROM policies WHERE name = 'Renters Insurance');

-- GENERAL INSURANCE (3 plans)
INSERT INTO policies (name, description, base_annual_premium, coverage_amount) 
SELECT 'Travel Insurance', 'Worry-free journeys with worldwide coverage', 75000, 20000000
WHERE NOT EXISTS (SELECT 1 FROM policies WHERE name = 'Travel Insurance');

INSERT INTO policies (name, description, base_annual_premium, coverage_amount) 
SELECT 'Business Insurance', 'Comprehensive protection for your business operations', 650000, 95000000
WHERE NOT EXISTS (SELECT 1 FROM policies WHERE name = 'Business Insurance');

INSERT INTO policies (name, description, base_annual_premium, coverage_amount) 
SELECT 'Liability Insurance', 'Protection against legal claims and lawsuits', 380000, 75000000
WHERE NOT EXISTS (SELECT 1 FROM policies WHERE name = 'Liability Insurance');

-- Update existing policies with varied prices
UPDATE policies SET base_annual_premium = 350000, coverage_amount = 50000000 WHERE name = 'Term Life Insurance';
UPDATE policies SET base_annual_premium = 550000, coverage_amount = 75000000 WHERE name = 'Whole Life Insurance';
UPDATE policies SET base_annual_premium = 480000, coverage_amount = 65000000 WHERE name = 'Universal Life Insurance';
UPDATE policies SET base_annual_premium = 280000, coverage_amount = 30000000 WHERE name = 'Health Insurance';
UPDATE policies SET base_annual_premium = 420000, coverage_amount = 50000000 WHERE name = 'Critical Illness Insurance';
UPDATE policies SET base_annual_premium = 320000, coverage_amount = 40000000 WHERE name = 'Medical Insurance';
UPDATE policies SET base_annual_premium = 180000, coverage_amount = 25000000 WHERE name = 'Auto Insurance';
UPDATE policies SET base_annual_premium = 200000, coverage_amount = 30000000 WHERE name = 'Car Insurance';
UPDATE policies SET base_annual_premium = 165000, coverage_amount = 15000000 WHERE name = 'Motor Insurance';
UPDATE policies SET base_annual_premium = 250000, coverage_amount = 80000000 WHERE name = 'Home Insurance';
UPDATE policies SET base_annual_premium = 300000, coverage_amount = 99000000 WHERE name = 'Property Insurance';
UPDATE policies SET base_annual_premium = 85000, coverage_amount = 10000000 WHERE name = 'Renters Insurance';
UPDATE policies SET base_annual_premium = 75000, coverage_amount = 20000000 WHERE name = 'Travel Insurance';
UPDATE policies SET base_annual_premium = 650000, coverage_amount = 95000000 WHERE name = 'Business Insurance';
UPDATE policies SET base_annual_premium = 380000, coverage_amount = 75000000 WHERE name = 'Liability Insurance';

-- Verify the results
SELECT id, name, base_annual_premium, coverage_amount FROM policies ORDER BY base_annual_premium ASC;
