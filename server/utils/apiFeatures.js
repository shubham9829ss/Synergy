class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    let searching = {};
    if (this.queryStr.lastSongId) {
      searching._id = { $gt: this.queryStr.lastSongId };
    }
    if (this.queryStr.keyword && this.queryStr.keyword.length > 0) {
      searching.title = { $regex: this.queryStr.keyword, $options: "i" };
    }

    this.query = this.query.find({ ...searching }).limit(4);
    return this;
  }

  // filter() {
  //   const queryCopy = { ...this.queryStr };
  //   const removeFields = ["keyword", "page", "limit"];
  //   removeFields.forEach((key) => delete queryCopy[key]);
  //   let queryStr = JSON.stringify(queryCopy);
  //   this.query = this.query.find(JSON.parse(queryStr));
  //   return this;
  // }
}

export default ApiFeatures;
