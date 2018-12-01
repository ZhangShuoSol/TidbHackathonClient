export default function ChartMixin(resKey, ChartConstructor) {
  return {
    props  : {
      data: [Object, Array]
    },
    mounted() {
      this.draw();
    },
    methods: {
      draw() {
        if (this.$refs[resKey] && this.data) {
          this.$nextTick(function () {
            this.$refs[resKey].innerHTML = '';
            const instance = new ChartConstructor(this.$refs[resKey]);
            instance.draw(this.data);
          })
        }
      }
    },
    watch  : {
      data: {
        deep: true,
        handler(val) {
          this.draw();
        }
      }
    }
  }
}
