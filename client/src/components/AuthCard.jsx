import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AuthCard.module.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 350,
      damping: 25
    }
  }
};

export default function AuthCard({ title, subtitle, globalError, children, onSubmit }) {
  return (
    <motion.div className={styles.container} layout>
      <motion.div 
        className={styles.logoContainer}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        layout
      >
        <img src="/icon.png" alt="Logo" className={styles.logoImage} />
      </motion.div>

      <motion.h1 className={styles.heading} layout>{title}</motion.h1>
      <motion.p className={styles.subtitle} layout>{subtitle}</motion.p>

      <AnimatePresence mode="popLayout">
        {globalError && (
          <motion.div 
            className={styles.globalError}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            layout
          >
            <FiAlertCircle size={16} />
            <span>{globalError}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.form 
        className={styles.formStack} 
        onSubmit={onSubmit} 
        noValidate
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        layout
      >
        {React.Children.map(children, (child, index) => {
          if (!child) return null;
          return (
            <motion.div key={index} variants={itemVariants} layout="position">
              {child}
            </motion.div>
          );
        })}
      </motion.form>
    </motion.div>
  );
}
