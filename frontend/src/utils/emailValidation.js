// #frontend/src/utils/emailValidation.js

/**
 * Validate if email is from IIT Mandi domain
 * Accepts any subdomain of iitmandi.ac.in
 * 
 * Valid examples:
 * - student@students.iitmandi.ac.in ✅
 * - faculty@faculty.iitmandi.ac.in ✅
 * - admin@iitmandi.ac.in ✅
 * - staff@hr.iitmandi.ac.in ✅
 * 
 * Invalid:
 * - user@gmail.com ❌
 * - user@iitd.ac.in ❌
 */
export const validateIITMandiEmail = (email) => {
  if (!email || !email.includes('@')) {
    return false;
  }

  const domain = email.split('@')[1]?.toLowerCase();
  return domain && domain.endsWith('iitmandi.ac.in');
};

/**
 * Get subdomain from email
 * Example: student@students.iitmandi.ac.in -> "students"
 */
export const getEmailSubdomain = (email) => {
  if (!email || !email.includes('@')) {
    return '';
  }

  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain || !domain.endsWith('iitmandi.ac.in')) {
    return '';
  }

  // Remove .iitmandi.ac.in to get subdomain
  const subdomain = domain.replace('.iitmandi.ac.in', '').replace('iitmandi.ac.in', '');
  return subdomain;
};

/**
 * Get suggested role based on email subdomain
 */
export const suggestRoleFromEmail = (email) => {
  const subdomain = getEmailSubdomain(email);

  const roleMapping = {
    'students': 'STUDENT',
    'student': 'STUDENT',
    'faculty': 'FACULTY',
    'staff': 'AUTHORITY',
    'admin': 'ADMIN',
    '': 'ADMIN', // Main domain usually for admin/staff
  };

  return roleMapping[subdomain] || 'STUDENT';
};

/**
 * Format email validation error message
 */
export const getEmailErrorMessage = (email) => {
  if (!email) {
    return 'Email is required';
  }

  if (!email.includes('@')) {
    return 'Invalid email format';
  }

  if (!validateIITMandiEmail(email)) {
    return 'Email must be from IIT Mandi domain (e.g., user@students.iitmandi.ac.in)';
  }

  return '';
};

/**
 * Example valid emails for different roles
 */
export const EMAIL_EXAMPLES = {
  STUDENT: 'b24136@students.iitmandi.ac.in',
  FACULTY: 'john.doe@faculty.iitmandi.ac.in',
  AUTHORITY: 'officer@staff.iitmandi.ac.in',
  ADMIN: 'admin@iitmandi.ac.in',
};

export default {
  validateIITMandiEmail,
  getEmailSubdomain,
  suggestRoleFromEmail,
  getEmailErrorMessage,
  EMAIL_EXAMPLES,
};