// Verify Supabase connection string format
// This script helps you check if your connection string is correct

console.log('='.repeat(60));
console.log('Supabase Connection String Verification Tool');
console.log('='.repeat(60));
console.log();

// Read from .env.local (for reference)
const fs = require('fs');
const path = require('path');

try {
  const envPath = path.join(__dirname, '.env.local');
  const envContent = fs.readFileSync(envPath, 'utf8');
  
  const dbUrlMatch = envContent.match(/DATABASE_URL=(.+)/);
  
  if (dbUrlMatch) {
    const localDbUrl = dbUrlMatch[1].trim();
    console.log('📋 Local DATABASE_URL (.env.local):');
    console.log(localDbUrl);
    console.log();
    
    // Parse the connection string
    const urlPattern = /postgresql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/([^?]+)(\?.*)?/;
    const match = localDbUrl.match(urlPattern);
    
    if (match) {
      const [, user, password, host, port, database, params] = match;
      
      console.log('📊 Parsed Components:');
      console.log(`  User:     ${user}`);
      console.log(`  Password: ${'*'.repeat(password.length)}`);
      console.log(`  Host:     ${host}`);
      console.log(`  Port:     ${port}`);
      console.log(`  Database: ${database}`);
      console.log(`  Params:   ${params || '(none)'}`);
      console.log();
      
      // Check if it's using pooler
      const isPooler = host.includes('pooler.supabase.com');
      const isDirectConnection = host.includes('db.') && host.includes('.supabase.co');
      const hasPgBouncer = params && params.includes('pgbouncer=true');
      
      console.log('✅ Verification Results:');
      console.log();
      
      if (isDirectConnection) {
        console.log('  ⚠️  Using DIRECT connection (port 5432)');
        console.log('      This is OK for local development');
        console.log('      But NOT suitable for Vercel deployment');
        console.log();
      }
      
      if (isPooler) {
        console.log('  ✅ Using POOLER connection');
        console.log(`  ${port === '6543' ? '✅' : '❌'} Port is ${port} ${port === '6543' ? '(correct)' : '(should be 6543)'}`);
        console.log(`  ${hasPgBouncer ? '✅' : '❌'} Has pgbouncer=true parameter ${hasPgBouncer ? '' : '(MISSING!)'}`);
        console.log();
      }
      
      console.log('📝 For Vercel Production:');
      console.log();
      console.log('Your Vercel DATABASE_URL should look like:');
      console.log();
      
      if (isDirectConnection) {
        // Generate pooler version
        const projectRef = host.match(/db\.([^.]+)\.supabase\.co/)?.[1];
        if (projectRef) {
          const poolerUrl = `postgresql://${user}:${password}@aws-0-ap-southeast-1.pooler.supabase.com:6543/${database}?pgbouncer=true`;
          console.log('  ' + poolerUrl);
          console.log();
          console.log('  ⚠️  Note: The region (aws-0-ap-southeast-1) might be different');
          console.log('      Get the exact URL from Supabase Dashboard:');
          console.log('      Settings → Database → Connection pooling');
        }
      } else if (isPooler) {
        if (port !== '6543' || !hasPgBouncer) {
          const correctedUrl = `postgresql://${user}:${password}@${host}:6543/${database}?pgbouncer=true`;
          console.log('  ' + correctedUrl);
        } else {
          console.log('  ' + localDbUrl);
          console.log();
          console.log('  ✅ This connection string looks correct!');
        }
      }
      
    } else {
      console.log('❌ Could not parse DATABASE_URL');
      console.log('   Format should be: postgresql://user:password@host:port/database');
    }
    
  } else {
    console.log('❌ DATABASE_URL not found in .env.local');
  }
  
} catch (error) {
  console.log('❌ Error reading .env.local:', error.message);
}

console.log();
console.log('='.repeat(60));
console.log('Next Steps:');
console.log('='.repeat(60));
console.log();
console.log('1. Get the correct Pooler connection string from Supabase:');
console.log('   Dashboard → Settings → Database → Connection pooling');
console.log();
console.log('2. Update Vercel environment variable:');
console.log('   Vercel Dashboard → Settings → Environment Variables');
console.log('   Update DATABASE_URL and check ☑ Production');
console.log();
console.log('3. Redeploy on Vercel');
console.log();
console.log('4. Test with: node test-db-connection.js');
console.log();
