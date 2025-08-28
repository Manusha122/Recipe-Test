import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../api";
import { Link } from "react-router-dom";

export default function Favorites() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Loading favorites...'); // Debug log
      const response = await API.get("/api/favorites");
      console.log('API Response:', response); // Debug log
      
      // Handle different response structures
      const data = response.data || response;
      console.log('Extracted data:', data); // Debug log
      
      // Ensure data is an array
      if (Array.isArray(data)) {
        setItems(data);
        console.log('Items set:', data.length, 'items'); // Debug log
      } else {
        console.error('Data is not an array:', data);
        setItems([]);
      }
    } catch (err) {
      console.error('Error loading favorites:', err);
      setError(err.message || 'Failed to load favorites');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    load(); 
  }, []);

  const remove = async (mealId) => {
    try {
      console.log('Removing item with mealId:', mealId); // Debug log
      await API.delete(`/api/favorites/${mealId}`);
      setItems(list => list.filter(x => x.mealId !== mealId));
      console.log('Item removed successfully'); // Debug log
    } catch (err) {
      console.error('Error removing favorite:', err);
      setError('Failed to remove item');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300
      }
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: 'clamp(16px, 3vw, 20px)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    },
    
    innerContainer: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 clamp(16px, 3vw, 20px)'
    },
    
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 'clamp(24px, 4vw, 40px)',
      flexWrap: 'wrap',
      gap: 'clamp(16px, 3vw, 20px)'
    },
    
    title: {
      fontSize: 'clamp(1.5rem, 5vw, 3.5rem)',
      fontWeight: '800',
      color: '#ffffff',
      margin: 0,
      textShadow: '0 4px 20px rgba(0,0,0,0.3)',
      background: 'linear-gradient(135deg, #ffffff 0%, #f0f2ff 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    
    backLink: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: 'clamp(10px, 2vw, 12px) clamp(18px, 3vw, 24px)',
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '50px',
      color: '#ffffff',
      textDecoration: 'none',
      fontWeight: '600',
      fontSize: 'clamp(12px, 2.5vw, 14px)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
    },

    errorMessage: {
      background: 'rgba(255, 107, 107, 0.2)',
      border: '1px solid rgba(255, 107, 107, 0.3)',
      color: '#ffffff',
      padding: 'clamp(16px, 3vw, 20px)',
      borderRadius: '16px',
      marginBottom: '20px',
      textAlign: 'center'
    },
    
    loadingSpinner: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '200px',
      color: '#ffffff',
      fontSize: 'clamp(16px, 3vw, 18px)'
    },
    
    spinner: {
      width: 'clamp(32px, 5vw, 40px)',
      height: 'clamp(32px, 5vw, 40px)',
      border: '4px solid rgba(255,255,255,0.3)',
      borderTop: '4px solid #ffffff',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginRight: '16px'
    },
    
    emptyState: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      textAlign: 'center'
    },
    
    emptyCard: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '24px',
      padding: 'clamp(40px, 8vw, 60px) clamp(24px, 6vw, 40px)',
      color: '#ffffff',
      fontSize: 'clamp(16px, 3vw, 18px)',
      fontWeight: '500',
      boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
      maxWidth: '400px',
      width: '100%'
    },
    
    emptyIcon: {
      fontSize: 'clamp(3rem, 8vw, 4rem)',
      marginBottom: '20px',
      opacity: 0.6
    },
    
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))',
      gap: 'clamp(20px, 4vw, 30px)',
      padding: 'clamp(16px, 3vw, 20px) 0'
    },
    
    card: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '24px',
      padding: 'clamp(16px, 3vw, 20px)',
      boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      overflow: 'hidden',
      position: 'relative'
    },
    
    imageContainer: {
      position: 'relative',
      borderRadius: '16px',
      overflow: 'hidden',
      marginBottom: '16px',
      background: 'linear-gradient(45deg, #f0f2ff, #e8eaff)',
      aspectRatio: '16/10'
    },
    
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      borderRadius: '16px'
    },
    
    cardContent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'clamp(12px, 3vw, 16px)',
      flexWrap: 'wrap'
    },
    
    mealName: {
      fontWeight: '700',
      fontSize: 'clamp(16px, 3vw, 18px)',
      color: '#ffffff',
      margin: 0,
      flex: 1,
      minWidth: '0',
      lineHeight: '1.4',
      textShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    
    removeButton: {
      background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
      border: 'none',
      borderRadius: '12px',
      color: '#ffffff',
      cursor: 'pointer',
      fontSize: 'clamp(12px, 2.5vw, 14px)',
      fontWeight: '600',
      padding: 'clamp(8px, 2vw, 10px) clamp(12px, 3vw, 16px)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 4px 20px rgba(255, 107, 107, 0.3)',
      minWidth: 'clamp(70px, 15vw, 80px)',
      flexShrink: 0
    }
  };

  // Loading state
  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.innerContainer}>
          <motion.div 
            style={styles.header}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 style={styles.title}>My Favorites</h1>
            <Link to="/" style={styles.backLink}>
              ← Back to Dashboard
            </Link>
          </motion.div>
          
          <div style={styles.loadingSpinner}>
            <div style={styles.spinner}></div>
            Loading favorites...
          </div>
        </div>
        
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        <motion.div 
          style={styles.header}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 style={styles.title}>My Favorites</h1>
          <motion.div
            whileHover={{ 
              scale: 1.05,
              backgroundColor: 'rgba(255, 255, 255, 0.25)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/" 
              style={styles.backLink}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)';
              }}
            >
              ← Back to Dashboard
            </Link>
          </motion.div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div 
            style={styles.errorMessage}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h3>Error Loading Favorites</h3>
            <p>{error}</p>
            <button 
              onClick={load}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '8px',
                color: '#fff',
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              Try Again
            </button>
          </motion.div>
        )}

        {/* Content */}
        {!error && items.length === 0 ? (
          <motion.div 
            style={styles.emptyState}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div style={styles.emptyCard}>
              <div style={styles.emptyIcon}>🤍</div>
              <div>No favorites yet.</div>
              <div style={{ fontSize: 'clamp(12px, 2.5vw, 14px)', opacity: 0.8, marginTop: '12px' }}>
                Start exploring and add some delicious meals to your favorites!
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            style={styles.grid}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {items.map((it, index) => (
              <motion.div 
                key={it._id || it.id || index}
                style={styles.card}
                variants={cardVariants}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  boxShadow: '0 25px 80px rgba(0,0,0,0.2)'
                }}
                whileTap={{ scale: 0.98 }}
                onHoverStart={() => {
                  const img = document.querySelector(`#img-${it._id || it.id || index}`);
                  if (img) img.style.transform = 'scale(1.1)';
                }}
                onHoverEnd={() => {
                  const img = document.querySelector(`#img-${it._id || it.id || index}`);
                  if (img) img.style.transform = 'scale(1)';
                }}
              >
                <div style={styles.imageContainer}>
                  <img 
                    id={`img-${it._id || it.id || index}`}
                    src={it.thumb || it.image || it.thumbnail || 'https://via.placeholder.com/300x200?text=No+Image'} 
                    alt={it.name || 'Favorite meal'}
                    style={styles.image}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                    }}
                  />
                </div>
                
                <div style={styles.cardContent}>
                  <h3 style={styles.mealName}>
                    {it.name || it.title || 'Unnamed Meal'}
                  </h3>
                  <motion.button 
                    style={styles.removeButton}
                    onClick={() => remove(it.mealId || it.id || it._id)}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 6px 25px rgba(255, 107, 107, 0.4)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'linear-gradient(135deg, #ff5252 0%, #d32f2f 100%)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)';
                    }}
                  >
                    Remove
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
      
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        /* Mobile First - Small devices (320px and up) */
        @media screen and (max-width: 480px) {
          .container {
            padding: 12px !important;
          }
          
          .innerContainer {
            padding: 0 12px !important;
          }
          
          .header {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 16px !important;
            margin-bottom: 24px !important;
          }
          
          .title {
            text-align: center !important;
            font-size: 1.75rem !important;
          }
          
          .backLink {
            justify-content: center !important;
            width: 100% !important;
            padding: 12px 20px !important;
            font-size: 14px !important;
          }
          
          .grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
            padding: 12px 0 !important;
          }
          
          .card {
            padding: 16px !important;
          }
          
          .cardContent {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 12px !important;
          }
          
          .mealName {
            text-align: center !important;
            font-size: 16px !important;
            margin-bottom: 8px !important;
          }
          
          .removeButton {
            width: 100% !important;
            text-align: center !important;
            padding: 12px 16px !important;
            font-size: 14px !important;
            min-width: auto !important;
          }
          
          .emptyCard {
            padding: 32px 20px !important;
            margin: 0 8px !important;
          }
          
          .emptyIcon {
            font-size: 2.5rem !important;
          }
          
          .loadingSpinner {
            flex-direction: column !important;
            gap: 12px !important;
            min-height: 150px !important;
          }
          
          .spinner {
            margin-right: 0 !important;
            margin-bottom: 8px !important;
          }
        }
        
        /* Tablet Portrait (481px - 768px) */
        @media screen and (min-width: 481px) and (max-width: 768px) {
          .container {
            padding: 16px !important;
          }
          
          .header {
            flex-direction: column !important;
            align-items: center !important;
            gap: 20px !important;
            text-align: center !important;
            margin-bottom: 32px !important;
          }
          
          .title {
            font-size: clamp(2rem, 6vw, 2.5rem) !important;
          }
          
          .backLink {
            padding: 12px 24px !important;
            font-size: 14px !important;
          }
          
          .grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)) !important;
            gap: 24px !important;
          }
          
          .cardContent {
            flex-direction: column !important;
            align-items: center !important;
            gap: 16px !important;
          }
          
          .mealName {
            text-align: center !important;
            font-size: 17px !important;
          }
          
          .removeButton {
            width: 100% !important;
            max-width: 200px !important;
            text-align: center !important;
            padding: 12px 20px !important;
          }
          
          .emptyCard {
            padding: 48px 32px !important;
          }
        }
        
        /* Tablet Landscape (769px - 1024px) */
        @media screen and (min-width: 769px) and (max-width: 1024px) {
          .container {
            padding: 20px !important;
          }
          
          .header {
            margin-bottom: 36px !important;
          }
          
          .grid {
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)) !important;
            gap: 28px !important;
          }
          
          .cardContent {
            flex-direction: row !important;
            align-items: center !important;
            gap: 16px !important;
          }
          
          .mealName {
            flex: 1 !important;
            text-align: left !important;
            font-size: 17px !important;
          }
          
          .removeButton {
            width: auto !important;
            min-width: 85px !important;
            padding: 10px 18px !important;
          }
        }
        
        /* Small Desktop (1025px - 1200px) */
        @media screen and (min-width: 1025px) and (max-width: 1200px) {
          .grid {
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)) !important;
            gap: 30px !important;
          }
          
          .cardContent {
            flex-direction: row !important;
            align-items: center !important;
          }
          
          .mealName {
            flex: 1 !important;
            min-width: 0 !important;
          }
        }
        
        /* Large Desktop (1201px and up) */
        @media screen and (min-width: 1201px) {
          .grid {
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)) !important;
          }
        }
        
        /* Extra optimizations for very small screens */
        @media screen and (max-width: 360px) {
          .title {
            font-size: 1.5rem !important;
          }
          
          .card {
            padding: 12px !important;
          }
          
          .imageContainer {
            margin-bottom: 12px !important;
          }
          
          .emptyCard {
            padding: 24px 16px !important;
            font-size: 16px !important;
          }
        }
        
        /* Large screens optimization */
        @media screen and (min-width: 1440px) {
          .innerContainer {
            padding: 0 24px !important;
          }
          
          .grid {
            gap: 32px !important;
          }
        }
        
        /* Ultra wide screens */
        @media screen and (min-width: 1920px) {
          .grid {
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)) !important;
            gap: 36px !important;
          }
        }
        
        /* Touch device optimizations */
        @media (hover: none) and (pointer: coarse) {
          .removeButton {
            min-height: 44px !important;
            font-size: 16px !important;
          }
          
          .backLink {
            min-height: 44px !important;
          }
          
          .card {
            transition: transform 0.2s ease !important;
          }
        }
        
        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
          
          .spinner {
            animation: none !important;
          }
        }
        
        /* High contrast mode */
        @media (prefers-contrast: high) {
          .card {
            border-width: 2px !important;
            border-color: rgba(255, 255, 255, 0.8) !important;
          }
          
          .removeButton {
            border: 2px solid rgba(255, 255, 255, 0.5) !important;
          }
        }
        
        /* Print styles */
        @media print {
          .container {
            background: none !important;
            color: #000 !important;
          }
          
          .card {
            background: #fff !important;
            border: 1px solid #ddd !important;
            break-inside: avoid !important;
          }
          
          .removeButton, .backLink {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}