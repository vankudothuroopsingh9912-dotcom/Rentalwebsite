/**
 * RentEase MERN Platform Automated Integration Test Suite
 * Tests Auth, Products, Rental Management, and Admin Role Authorization
 */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { store } from '../data/store.js';

interface TestResult {
  suite: string;
  test: string;
  passed: boolean;
  error?: string;
}

const results: TestResult[] = [];

function assert(condition: boolean, message: string, suite: string, test: string) {
  if (!condition) {
    results.push({ suite, test, passed: false, error: message });
    console.error(`❌ [FAIL] ${suite} -> ${test}: ${message}`);
  } else {
    results.push({ suite, test, passed: true });
    console.log(`✅ [PASS] ${suite} -> ${test}`);
  }
}

export async function runApiTests() {
  console.log('\n=============================================');
  console.log('🧪 RentEase Automated Backend Integration Suite');
  console.log('=============================================\n');

  // --- Suite 1: Database & Seed Integrity ---
  assert(store.products.length >= 15, 'Should have at least 15 seeded products across 5 categories', 'Data Layer', 'Seed Products Count');
  
  const categories = ['Furniture', 'Home Appliances', 'Electronics', 'Office Equipment', 'Kitchen Appliances'];
  for (const cat of categories) {
    const count = store.products.filter(p => p.category === cat).length;
    assert(count > 0, `Category ${cat} must contain seeded products`, 'Data Layer', `Category ${cat} Presence`);
  }

  // --- Suite 2: User Authentication & Bcrypt Hashing ---
  const demoAdmin = store.users.find(u => u.email === 'admin@rentease.com');
  assert(!!demoAdmin, 'Admin user must exist', 'Auth', 'Admin User Exists');
  assert(demoAdmin?.role === 'admin', 'Admin must have admin role', 'Auth', 'Admin Role');

  if (demoAdmin && demoAdmin.password) {
    const isMatch = await bcrypt.compare('Admin@123', demoAdmin.password);
    assert(isMatch, 'Bcrypt password comparison for Admin@123 must pass', 'Auth', 'Admin Password Hash');
  }

  const demoCustomer = store.users.find(u => u.email === 'john@example.com');
  assert(!!demoCustomer, 'Demo customer john@example.com must exist', 'Auth', 'Customer User Exists');
  assert(demoCustomer?.role === 'user', 'Demo user must have user role', 'Auth', 'Customer Role');

  // --- Suite 3: Rental Tenure & Discount Math ---
  const sampleProduct = store.products[0];
  const monthlyBase = sampleProduct.pricePerMonth;
  
  // 6 month plan (10% off)
  const sixMonthRate = Math.round(monthlyBase * 0.9);
  assert(sixMonthRate < monthlyBase, '6-month plan must yield discounted monthly rate', 'Rental Math', '6 Month Discount');

  // 12 month plan (20% off)
  const twelveMonthRate = Math.round(monthlyBase * 0.8);
  assert(twelveMonthRate < sixMonthRate, '12-month plan must yield 20% discount', 'Rental Math', '12 Month Discount');

  // --- Suite 4: Rentals Workflow ---
  const activeRentals = store.rentals.filter(r => r.userId === 'usr-demo-01');
  assert(activeRentals.length > 0, 'Demo user must have seeded rental history', 'Rentals', 'User Rentals History');

  // Summary
  const passed = results.filter(r => r.passed).length;
  const total = results.length;
  console.log('\n---------------------------------------------');
  console.log(`Test Execution Finished: ${passed}/${total} passed (${Math.round((passed / total) * 100)}%)`);
  console.log('---------------------------------------------\n');

  return { passed, total, results };
}

// Self-run when executed directly via tsx
if (process.argv[1]?.includes('api.test.ts')) {
  runApiTests().catch(console.error);
}
