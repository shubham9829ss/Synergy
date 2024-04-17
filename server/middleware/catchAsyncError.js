export default (reqHandler) => (req, res, next) => {
  Promise.resolve(reqHandler(req, res, next)).catch((err) => next(err));
};
