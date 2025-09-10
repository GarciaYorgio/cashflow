import { motion } from 'framer-motion';

export const Greeting = () => {
  return (
    <div
      key="overview"
      // biome-ignore lint/nursery/useSortedClasses: <explanation>
      className="mx-auto mt-4 flex w-full justify-center h-full flex-col justify-center px-4 md:mt-16 md:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.5 }}
        className='text-center font-semibold text-xl md:text-2xl'
      >
        Hello there!
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.6 }}
        className="text-center text-xl text-zinc-500 md:text-2xl"
      >
        How can I help you today?
      </motion.div>
    </div>
  );
};
