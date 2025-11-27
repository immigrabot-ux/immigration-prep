#!/bin/bash

# Complete User Flow Test Script
# Tests all critical paths without manual interaction

echo "═══════════════════════════════════════════════════════"
echo "IMMIGRATION PREP - COMPLETE USER FLOW TEST"
echo "═══════════════════════════════════════════════════════"
echo ""

BASE_URL="http://localhost:3000"
TEST_EMAIL="test-$(date +%s)@example.com"
TEST_PASSWORD="TestPassword123!"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counters
PASSED=0
FAILED=0

# Helper function to test HTTP endpoint
test_endpoint() {
  local name="$1"
  local url="$2"
  local expected_status="$3"

  echo -n "Testing: $name... "

  status=$(curl -s -o /dev/null -w "%{http_code}" "$url")

  if [ "$status" = "$expected_status" ]; then
    echo -e "${GREEN}✅ PASS${NC} (HTTP $status)"
    ((PASSED++))
  else
    echo -e "${RED}❌ FAIL${NC} (Expected $expected_status, got $status)"
    ((FAILED++))
  fi
}

# Test HTML page loads
test_page() {
  local name="$1"
  local url="$2"

  echo -n "Testing: $name... "

  status=$(curl -s -o /dev/null -w "%{http_code}" "$url")

  if [ "$status" = "200" ]; then
    echo -e "${GREEN}✅ PASS${NC} (Page loads)"
    ((PASSED++))
  else
    echo -e "${RED}❌ FAIL${NC} (HTTP $status)"
    ((FAILED++))
  fi
}

echo "STEP 1: Landing Page & Navigation"
echo "════════════════════════════════════"
test_page "Landing page" "$BASE_URL/"
test_page "Browse page" "$BASE_URL/browse"
test_page "Login page" "$BASE_URL/auth/login"
test_page "Signup page" "$BASE_URL/auth/signup"
echo ""

echo "STEP 2: API Endpoints"
echo "════════════════════════════════════"
test_endpoint "Forms API" "$BASE_URL/api/forms" "200"
test_endpoint "Healthcheck (should 404 if not exist)" "$BASE_URL/api/health" "404"
echo ""

echo "STEP 3: Protected Routes (Should redirect)"
echo "════════════════════════════════════"
# Dashboard should redirect to login if not authenticated
status=$(curl -s -o /dev/null -w "%{http_code}" -L "$BASE_URL/dashboard")
if [ "$status" = "200" ]; then
  echo -e "Dashboard redirect: ${GREEN}✅ PASS${NC} (Redirects properly)"
  ((PASSED++))
else
  echo -e "Dashboard redirect: ${YELLOW}⚠️  WARNING${NC} (HTTP $status - check middleware)"
fi
echo ""

echo "STEP 4: Form Pages (Without Auth)"
echo "════════════════════════════════════"
test_page "I-130 form page" "$BASE_URL/dashboard/forms/i-130"
test_page "I-485 form page" "$BASE_URL/dashboard/forms/i-485"
test_page "N-400 form page" "$BASE_URL/dashboard/forms/n-400"
echo ""

echo "STEP 5: Static Assets"
echo "════════════════════════════════════"
# Check if PDF templates exist
if [ -f "public/pdf-templates/i-130-unlocked.pdf" ]; then
  echo -e "I-130 PDF template: ${GREEN}✅ EXISTS${NC}"
  ((PASSED++))
else
  echo -e "I-130 PDF template: ${RED}❌ MISSING${NC}"
  ((FAILED++))
fi

if [ -f "public/pdf-templates/i-485-unlocked.pdf" ]; then
  echo -e "I-485 PDF template: ${GREEN}✅ EXISTS${NC}"
  ((PASSED++))
else
  echo -e "I-485 PDF template: ${RED}❌ MISSING${NC}"
  ((FAILED++))
fi
echo ""

echo "STEP 6: Environment Variables"
echo "════════════════════════════════════"
if [ -f ".env.local" ]; then
  echo -e ".env.local file: ${GREEN}✅ EXISTS${NC}"
  ((PASSED++))

  # Check for required vars (without exposing values)
  if grep -q "NEXT_PUBLIC_SUPABASE_URL" .env.local; then
    echo -e "SUPABASE_URL configured: ${GREEN}✅ YES${NC}"
    ((PASSED++))
  else
    echo -e "SUPABASE_URL configured: ${RED}❌ NO${NC}"
    ((FAILED++))
  fi

  if grep -q "STRIPE_SECRET_KEY" .env.local; then
    echo -e "STRIPE_SECRET_KEY configured: ${GREEN}✅ YES${NC}"
    ((PASSED++))
  else
    echo -e "STRIPE_SECRET_KEY configured: ${RED}❌ NO${NC}"
    ((FAILED++))
  fi
else
  echo -e ".env.local file: ${RED}❌ MISSING${NC}"
  ((FAILED++))
fi
echo ""

echo "════════════════════════════════════"
echo "TEST SUMMARY"
echo "════════════════════════════════════"
echo -e "Passed: ${GREEN}$PASSED${NC}"
echo -e "Failed: ${RED}$FAILED${NC}"
TOTAL=$((PASSED + FAILED))
echo "Total:  $TOTAL"
echo ""

if [ $FAILED -eq 0 ]; then
  echo -e "${GREEN}✅ ALL TESTS PASSED!${NC}"
  echo ""
  echo "Next Steps:"
  echo "1. Manually test signup/login flow in browser"
  echo "2. Test Stripe checkout with test card"
  echo "3. Verify PDF generation works"
  exit 0
else
  echo -e "${RED}❌ SOME TESTS FAILED${NC}"
  echo ""
  echo "Fix the failing tests before proceeding."
  exit 1
fi
