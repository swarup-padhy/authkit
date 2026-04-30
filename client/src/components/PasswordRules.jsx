import React from 'react';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './PasswordRules.module.css';

const containerVariants = {
  hidden: { opacity: 0, height: 0, overflow: 'hidden', marginTop: 0 },
  visible: { 
    opacity: 1, 
    height: 'auto', 
    marginTop: 4,
    transition: { 
      height: { type: "spring", stiffness: 400, damping: 30 },
      opacity: { duration: 0.2, delay: 0.1 }
    }
  },
  exit: { 
    opacity: 0, 
    height: 0, 
    marginTop: 0,
    transition: { 
      height: { type: "spring", stiffness: 400, damping: 30 },
      opacity: { duration: 0.2 }
    }
  }
};

export default function PasswordRules({ rules, isVisible }) {
  const allSatisfied = Object.values(rules).every((val) => val === true);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div 
          className={styles.container}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          layout
        >
          {allSatisfied ? (
            <motion.div 
              className={styles.successText}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <FiCheckCircle size={14} />
              <span>Strong password</span>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}
            >
              <RuleItem label="Lowercase" isValid={rules.lower} />
              <RuleItem label="Uppercase" isValid={rules.upper} />
              <RuleItem label="Number" isValid={rules.number} />
              <RuleItem label="Special character" isValid={rules.special} />
              <RuleItem label="Minimum length (8+)" isValid={rules.minLength} />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function RuleItem({ label, isValid }) {
  return (
    <motion.div 
      className={`${styles.ruleItem} ${isValid ? styles.valid : styles.invalid}`}
      layout
    >
      {isValid ? <FiCheckCircle size={14} /> : <FiXCircle size={14} />}
      <span>{label}</span>
    </motion.div>
  );
}
