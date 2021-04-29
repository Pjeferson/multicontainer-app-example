// Proposital slowly version
module.exports = function fib(index) {
  if (index < 2) {
    return 1;
  } else {
    return fib(index - 1) + fib(index - 2); 
  }
};