
export default class AtomGraph {

  constructor() {
    this.verts = {};
    this.edges = {}

    // Short circuit string equality
    this.vertLabel = 0;
    this.vertMap = {}

    this.nodeFor = this.nodeFor.bind(this);
    this.addRenderer = this.addRenderer.bind(this);
    this.topologicalSort = this.topologicalSort.bind(this);
    this.getSorted = this.getSorted.bind(this);
  }

  addRenderer(vert) {
    if(vert.name in this.vertMap)
    {
      throw `Vert ${vert.name} already exists`;
    }
    if(! vert.after)
    {
      vert.after = [];
    }

    this.verts[this.vertLabel] = vert;
    this.vertMap[vert.name] = this.vertLabel;
    this.edges[this.vertLabel] = []

    vert.after.map((e, i) => {
      this.edges[this.vertLabel].push(this.nodeFor(e));
    })

    this.sorted = this.topologicalSort();
    this.vertLabel += 1
  }

  nodeFor(name) {
    if(!name in this.vertMap)
    {
      throw `No Such Vertex ${name}`
    }
    return this.vertMap[name]
  }

  topologicalSort() {
    let visited = Object.keys(this.vertMap).reduce((acc, val) => {
      acc[this.vertMap[val]] = false;
      return acc;
    }, {})
    let stack = [];
    let recurse = (vert, visited, stack) => {
      visited[vert] = true;
      this.edges[vert].map((e, i) => {
        if(!visited[e]) {
          recurse(e, visited, stack);
        }
      });
      stack.push(vert);
    }
    recurse = recurse.bind({edges: this.edges});
    Object.keys(this.vertMap).map((e, i) => {
      if(!visited[this.vertMap[e]]) {
        recurse(this.vertMap[e], visited, stack)
      }
    })

    return stack
  }

  getSorted() {
    return this.sorted.map((e,i) => {
      return this.verts[e]
    });
  }
}
