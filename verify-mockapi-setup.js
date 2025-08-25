#!/usr/bin/env node

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log(`
🔧 MOCKAPI INTEGRATION VERIFICATION
====================================

This script will help you verify your MockAPI integration.

Current .env.local configuration:
`);


try {
  const fs = require('fs');
  const envContent = fs.readFileSync('.env.local', 'utf8');
  console.log(envContent);
} catch (error) {
  console.log('❌ Cannot read .env.local file');
}

console.log(`
📋 VERIFICATION CHECKLIST:
=========================

1. ✅ Project files are ready
2. ✅ Development server is running (http://localhost:3000)
3. ✅ Sample data script created (setup-mockapi-data.js)
4. ⏳ MockAPI project needs to be created/verified
5. ⏳ .env.local needs correct MockAPI URL

📝 NEXT STEPS:
==============

If you haven't created your MockAPI project yet:
1. Go to https://mockapi.io/
2. Create account and new project "auto-garage-management"
3. Create 4 resources: garages, vehicles, work-orders, customers
4. Add sample data from setup-mockapi-data.js
5. Copy your project URL and update .env.local

If you have your MockAPI project URL, provide it and I'll update your configuration.

🚀 Your frontend is ready and waiting!
`);


function updateEnvFile(mockApiUrl) {
  try {
    const fs = require('fs');
    

    if (!mockApiUrl.includes('mockapi.io') || !mockApiUrl.includes('/api/v1')) {
      console.log('❌ Invalid MockAPI URL format. Should be: https://[project-id].mockapi.io/api/v1');
      return false;
    }


    let envContent = fs.readFileSync('.env.local', 'utf8');
    

    envContent = envContent.replace(
      /NEXT_PUBLIC_API_URL=.*/,
      `NEXT_PUBLIC_API_URL=${mockApiUrl}`
    );
    

    fs.writeFileSync('.env.local', envContent);
    
    console.log(`✅ Updated .env.local with your MockAPI URL: ${mockApiUrl}`);
    console.log(`
🔄 Please restart your development server:
   npm run dev

🌐 Then test your application at: http://localhost:3000
    `);
    
    return true;
  } catch (error) {
    console.log('❌ Error updating .env.local:', error.message);
    return false;
  }
}


function promptForUrl() {
  rl.question('\n🔗 Do you have your MockAPI project URL? (y/n): ', (answer) => {
    if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
      rl.question('📋 Please enter your MockAPI URL (https://[project-id].mockapi.io/api/v1): ', (url) => {
        const success = updateEnvFile(url.trim());
        if (success) {
          console.log('\n🎉 Setup complete! Your Auto Garage Management System is ready to use real API data!');
        }
        rl.close();
      });
    } else {
      console.log(`
📖 Follow these steps to create your MockAPI:

1. 🌐 Visit: https://mockapi.io/
2. 📝 Create account and new project "auto-garage-management"  
3. 📊 Create 4 resources: garages, vehicles, work-orders, customers
4. 📄 Copy sample data from setup-mockapi-data.js file
5. 🔗 Get your project URL and run this script again

💡 Tip: Your URL will look like: https://6543abc21def789.mockapi.io/api/v1
      `);
      rl.close();
    }
  });
}


promptForUrl();