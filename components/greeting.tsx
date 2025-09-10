import { motion } from 'framer-motion';

export const Greeting = () => {
  return (
    <div
      key="overview"
     className="mx-auto flex min-h-[80vh] w-full flex-col items-center justify-center px-4 md:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.5 }}
        className='text-center font-semibold text-xl md:text-2xl'
      >
        Hola @username!
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.6 }}
        className="text-center text-xl text-zinc-500 md:text-2xl"
      >
        ¿Cómo puedo ayudarte?
      </motion.div>
    </div>
  );
};
