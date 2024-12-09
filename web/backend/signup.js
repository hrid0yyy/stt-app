import { createClient } from '@supabase/supabase-js'
// Supabase Initialization
const supabaseUrl = 'https://lixgbffpefinudzrltwi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpeGdiZmZwZWZpbnVkenJsdHdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzMTg3MzIsImV4cCI6MjA0ODg5NDczMn0.VA3Ap-yrn6lCexpGMxdP3H7Q_H7b5y7sytF75116Los';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Signup Function
document.getElementById('signup-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const fullName = document.getElementById('full-name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  // Validate Passwords
  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  try {
    // 1. Sign up the user in Supabase Auth
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      console.error('Error during signup:', authError.message);
      alert('Signup failed. Please try again.');
      return;
    }

    // 2. Store additional user info in `shopowner_info`
    const { error: dbError } = await supabase.from('shopowner_info').insert([
      { full_name: fullName, email, password },
    ]);

    if (dbError) {
      console.error('Error inserting into database:', dbError.message);
      alert('Error storing user details. Please try again.');
      return;
    }

    alert('Signup successful!');
  } catch (err) {
    console.error('Unexpected error:', err.message);
    alert('An unexpected error occurred. Please try again.');
  }
});
