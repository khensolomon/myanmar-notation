export default {
  data: () => ({
    contentQuery: [
      '၇၈၉',
      '70',
      '77',
      '777',
      '3456',
      '10000000',
      '123456789'
    ]
  }),
  components: {},
  methods: {
    handleInput(e) {
      this.contentQuery = this.queryArray(e.target.innerHTML);
    },
    queryArray(e) {
      return e.replace(/<div>/g,'<br>').replace(/<\/div>/g,'').split(/<br>|\n|;/).map(e=>e.trim()).filter(e=>e);
    },
    queryString() {
      return this.contentQuery.replace(/<div>/g,'<br>').replace(/<\/div>/g,'').split(/<br>|\n/).map(e=>e.trim()).filter(e=>e).join(';')
    }
  },
  computed: {
    notation() {
      var result = [];
      this.contentQuery.forEach(item => {
        // @ts-ignore
        var notation = myanmarNotation.get(item);
        if (notation.notation.length){
          notation.query=item;
          result.push(notation);
        }
      });
      return result;
    }
  },
  // beforeCreate() {},
  // async created() {},
  // destroyed () {},
  mounted () {
    if (this.$route.query.q){
      var tmp = this.queryArray(this.$route.query.q);
      if (tmp.length){
        this.contentQuery = tmp;
      }
    }
    this.$refs.handleId.innerHTML = this.contentQuery.join('<br>');
  }
};
