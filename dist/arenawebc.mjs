class r {
  contentUrl;
  data;
  templates;
  templateBlocks;
  constructor(e) {
    this.templates = [], this.contentUrl = e.slug ? `https://api.are.na/v2/channels/${e.slug}?sort=position&order=asc&per=100` : "", this.templateBlocks = {}, this.init().then(() => {
    }).catch((t) => {
      console.log(t.message);
    });
  }
  async init() {
    this.data = await this.fetchContent(), this.handleTemplate();
  }
  async fetchContent() {
    if (this.contentUrl === "")
      throw Error("no arena channel slug provided");
    return await fetch(this.contentUrl).then((e) => e.json());
  }
  handleTemplate() {
    this.parseTemplateBlocks();
  }
  parseTemplateBlocks() {
    this.templates = [
      "image",
      "text"
    ], this.templates.forEach((e) => {
      let t = e.replace(/[A-Z]/g, "-$&").toLowerCase(), n = e.split(/[A-Z]/g)[0];
      n = n[0].toUpperCase() + n.slice(1);
      let s = document.querySelector(`.${t}-blocks`), a = document.getElementById(`${t}-block`);
      this.templateBlocks[e] = {
        name: n,
        container: s,
        template: a ? a.content : null
      };
    }), this.parseContent();
  }
  parseContent() {
    this.data?.contents?.forEach((e) => {
      switch (e.class) {
        case "Image":
          this.renderContent(e, this.templateBlocks.image);
          break;
        case "Text":
          this.renderContent(e, this.templateBlocks.text);
          break;
      }
    });
  }
  renderContent(e, t) {
    if (!t.template || !t.container)
      return;
    let n = t.template.cloneNode(!0), a = Object.assign({}, ...[
      "title",
      "image",
      "video",
      "link",
      "content",
      "description",
      "descriptionHtml"
    ].map((l) => ({
      [l]: n.querySelector(`.${l.replace(/[A-Z]/g, "-$&").toLowerCase()}`)
    })));
    a.title && (e.title ? a.title.innerHTML = e.title : a.title.remove()), a.image && (e.image ? a.image.src = e.image.large.url : a.image.remove()), t.container.append(n);
  }
}
export {
  r as ArenaWebComponent
};
