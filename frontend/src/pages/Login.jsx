import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, ChefHat, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        // Login logic
        const res = await login(formData.email, formData.password);

        // ✅ Save token after login
        if (res?.data?.token) {
          localStorage.setItem("token", res.data.token);
        }

        navigate("/"); // Navigate to dashboard after successful login
      } else {
        // Register logic
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords do not match");
        }

        const res = await register(formData.name, formData.email, formData.password);

        // ✅ Save token after registration
        if (res?.data?.token) {
          localStorage.setItem("token", res.data.token);
        }

        navigate("/"); // Navigate to dashboard after successful registration
      }
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError(""); // Clear error when switching modes
    setFormData({ email: "", password: "", name: "", confirmPassword: "" });
  };

  // animation variants & styles (unchanged)
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6, staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };
  const formVariants = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }, exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } } };
  const floatingVariants = { animate: { y: [-10, 10, -10], rotate: [0, 5, -5, 0], transition: { duration: 6, repeat: Infinity, ease: "easeInOut" } } };

  const styles = { /* keeping your full style object unchanged */ };

  return (
    <div style={styles.container}>
      {/* Animated background */}
      <div>
        <motion.div variants={floatingVariants} animate="animate" style={styles.backgroundElement1} />
        <motion.div variants={floatingVariants} animate="animate" style={{...styles.backgroundElement2, animationDelay: '2s'}} />
        <motion.div variants={floatingVariants} animate="animate" style={{...styles.backgroundElement3, animationDelay: '4s'}} />
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" style={styles.mainContainer}>
        {/* Logo + Title */}
        <motion.div variants={itemVariants} style={styles.logoContainer}>
          <motion.div whileHover={{ scale: 1.1, rotate: 10 }} style={styles.logoIcon}>
            <ChefHat size={32} color="white" />
          </motion.div>
          <h1 style={styles.title}>Recipe Master</h1>
          <p style={styles.subtitle}>Discover amazing recipes from around the world</p>
        </motion.div>

        {/* Auth Form Card */}
        <motion.div variants={itemVariants} style={styles.card}>
          {/* Toggle Buttons */}
          <div style={styles.toggleContainer}>
            <motion.button
              type="button"
              onClick={() => setIsLogin(true)}
              style={{ ...styles.toggleButton, ...(isLogin ? styles.toggleButtonActive : styles.toggleButtonInactive) }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Login
            </motion.button>
            <motion.button
              type="button"
              onClick={() => setIsLogin(false)}
              style={{ ...styles.toggleButton, ...(!isLogin ? styles.toggleButtonActive : styles.toggleButtonInactive) }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Register
            </motion.button>
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={isLogin ? "login" : "register"}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onSubmit={handleSubmit}
              style={styles.form}
            >
              {error && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={styles.errorMessage}>
                  {error}
                </motion.div>
              )}

              {!isLogin && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} style={styles.inputContainer}>
                  <User size={20} style={styles.inputIcon} />
                  <input type="text" placeholder="Full Name" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} style={styles.input} />
                </motion.div>
              )}

              <div style={styles.inputContainer}>
                <Mail size={20} style={styles.inputIcon} />
                <motion.input whileFocus={{ scale: 1.02 }} type="email" placeholder="Email Address" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} style={styles.input} />
              </div>

              <div style={styles.inputContainer}>
                <Lock size={20} style={styles.inputIcon} />
                <motion.input whileFocus={{ scale: 1.02 }} type={showPassword ? "text" : "password"} placeholder="Password" value={formData.password} onChange={(e) => handleInputChange("password", e.target.value)} style={{...styles.input, ...styles.inputWithRightIcon}} />
                <motion.button type="button" onClick={() => setShowPassword(!showPassword)} style={styles.eyeButton} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </motion.button>
              </div>

              {!isLogin && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} style={styles.inputContainer}>
                  <Lock size={20} style={styles.inputIcon} />
                  <input type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={(e) => handleInputChange("confirmPassword", e.target.value)} style={styles.input} />
                </motion.div>
              )}

              {isLogin && (
                <div style={styles.forgotPassword}>
                  <motion.a href="#" style={styles.forgotLink} whileHover={{ scale: 1.05, color: 'white' }}>
                    Forgot Password?
                  </motion.a>
                </div>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                style={{ ...styles.submitButton, ...(loading ? styles.loadingButton : {}) }}
                whileHover={loading ? {} : { scale: 1.02, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)" }}
                whileTap={loading ? {} : { scale: 0.98 }}
              >
                {loading ? (
                  <>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} style={{ width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%' }} />
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles size={20} />
                    {isLogin ? "Sign In" : "Create Account"}
                  </>
                )}
              </motion.button>
            </motion.form>
          </AnimatePresence>

          <motion.div variants={itemVariants} style={styles.toggleText}>
            <p style={styles.toggleTextContent}>
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <motion.button onClick={toggleMode} style={styles.toggleTextButton} whileHover={{ scale: 1.05, color: '#c4b5fd' }} whileTap={{ scale: 0.95 }}>
                {isLogin ? "Sign up" : "Sign in"}
              </motion.button>
            </p>
          </motion.div>

          {/* Social Login */}
          <motion.div variants={itemVariants} style={styles.socialSection}>
            <p style={styles.socialText}>Or continue with</p>
            <div style={styles.socialButtons}>
              <motion.button style={styles.socialButton} whileHover={{ scale: 1.02, y: -2, background: 'rgba(255, 255, 255, 0.2)' }} whileTap={{ scale: 0.98 }}>
                <div style={{...styles.socialIcon, ...styles.googleIcon}}>G</div>
                Google
              </motion.button>
              <motion.button style={styles.socialButton} whileHover={{ scale: 1.02, y: -2, background: 'rgba(255, 255, 255, 0.2)' }} whileTap={{ scale: 0.98 }}>
                <div style={{...styles.socialIcon, ...styles.facebookIcon}}>f</div>
                Facebook
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
