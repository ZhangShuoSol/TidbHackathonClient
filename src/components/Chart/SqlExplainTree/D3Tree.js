import * as d3 from 'd3'


const margin   = {top: 30, right: 20, bottom: 30, left: 20},
      nodeSize = {width: 300, height: 200, margin: 10},
      duration = 400;


const TITLE_COLOR_CLASS = [
  'primary',
  'success',
  'warning',
  'danger',
];


export default class D3Tree {
  constructor(el, context) {
    this.$el = el;
    this.$context = context;
    const style = getComputedStyle(this.$el);
    this.width = parseFloat(style.width);
    this.height = parseFloat(style.height);


    // this.svg = d3.select(this.$el)
    //   .append('svg')
    //   .attr('width', this.width)
    //   .attr('height', this.height);

    this.svg = d3.select(this.$el)
      .append('svg')
      .style('user-select', 'none')
      .attr("preserveAspectRatio", "xMidYMid meet"); // 自适应容器尺寸

    // 树状图缩放功能
    this.zoom = d3.zoom()
      .on('zoom', () => {
        const t = d3.zoomTransform(this.svg.node());
        this.g.attr("transform", t.scale(t.k));
      });

    this.svg.call(this.zoom);

    // 设置 svg 的 viewport
    const viewPortWidth  = 4 * nodeSize.width,
          viewPortHeight = 8 * nodeSize.height;

    this.svg
      .attr("viewBox", [
        -margin.left - viewPortWidth / 2,
        -margin.top,
        viewPortWidth + margin.right,
        viewPortHeight + margin.bottom
      ]);

    // 初始化树状图数据获取器
    this.tree = d3.tree()
      .nodeSize([nodeSize.width, nodeSize.height]);

  }

  draw(data) {
    const hierarchyData = d3.hierarchy(data, function (d) {
      return d.nodes;
    })
      .sum(function (d) {
        return d.value;
      });

    // 初始化树状图
    this.treeData = this.tree(hierarchyData);
    this.$_draw();
  }

  $_draw() {
    const ctx = this;

    console.log(this.svg);
    // 删除当前树
    this.svg && this.svg.html('');


    // 获取节点
    let nodes = this.treeData.descendants();
    // 获取连线
    let links = this.treeData.links();


    console.log('treeData', this.treeData);
    console.log('nodes', nodes);
    console.log('links', links);

    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].children) {
        nodes[i]._children = nodes[i].children;
      }
    }

    if (this.g) {
      this.g = this.svg.append('g').attr('transform', this.g.attr('transform'))
    } else {
      this.g = this.svg.append('g').attr('transform', 'translate(40, 40)');
    }

    // 绘制线

    this.g.selectAll('.link')
      .data(links)
      .enter().append('path')
      .attr('class', 'link')
      .attr('d', d3.linkVertical()
        .x(d => d.x)
        .y(d => d.y));

    // 创建节点
    this.g.selectAll('.node')
      .data(nodes)
      .enter().append('g')
      .attr('class', function (d) {
        return 'node' + (d.children ? ' node--internal' : ' node--leaf')
      })
      .attr('transform', function (d) {
        return `translate(${d.x}, ${d.y})`;
      });

    // 创建标题框
    this.g.selectAll(('.node')).append('foreignObject')
      .append(createNode.bind(this));
  }
}

function createNode(d, index, group) {
  const div = d3.create('div')
    .attr('class', `tree-node__block ${TITLE_COLOR_CLASS[d.depth % 4]}`);
  div.append('h1').text(d.data.name);

  const body = d3.create('div').attr('class', 'tree-node__body');

  // 节点信息
  const info = d3.create('div')
    .attr('class', 'tree-node__info');
  info.append('div').attr('class', 'info-item')
    .text(`table: ${d.data.info.table}`);
  info.append('div').attr('class', 'info-item')
    .text(`count: ${d.data.info.count}`);
  info.append('div').attr('class', 'info-item')
    .text(`time: ${d.data.info.executeinfoMap.time}`);

  // 显示更多按钮
  const more_info = document.createElement('div');
  more_info.classList.add('tree-node__info-more');
  const btn_more = document.createElement('i');
  btn_more.classList.add('el-icon-more-outline');
  btn_more.addEventListener("click", e => {
    e.preventDefault();
    e.stopPropagation();
    this.$context.$emit('show-tree-node-info', e, d, index, group);
  });
  more_info.appendChild(btn_more);

  // 节点添加鼠标经过, 离开事件
  div.node().addEventListener('mouseenter', e => {
    this.$context.$emit('on-enter-tree-node', e, d, index, group);
  });
  div.node().addEventListener('mouseleave', e => {
    this.$context.$emit('on-leave-tree-node', e, d, index, group);
  });

  // 收缩节点按钮
  if (d.children || d._children) {
    const btn_collapseTreeNode = d3.create('div');
    btn_collapseTreeNode.attr('class', 'collapse-tree-node');
    btn_collapseTreeNode.node().addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      if (d.children) {//如果这个节点有children属性，则删除并重新绘图
        delete d.children;
        this.$_draw();
      }
      else {//否则的话，检测这个节点是否有_children属性，有的话为这个节点添加children属性，并重新绘图
        if (d._children) {
          d.children = d._children;
          this.$_draw();
        }
      }
    });
    btn_collapseTreeNode.append(_ => d3.create('i')
      .attr('class', d.children ? 'el-icon-arrow-up' : 'el-icon-arrow-down')
      .node());

    div.append(_ => btn_collapseTreeNode.node());
  }

  body.append(_ => info.node());
  body.append(_ => more_info);
  div.append(_ => body.node());

  return div.node();
}
