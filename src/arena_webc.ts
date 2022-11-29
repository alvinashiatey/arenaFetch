import { Arena, BlockEntity, ContentsEntity } from "./arena.type";

class ArenaWebComponent {
  private readonly contentUrl: string;
  private data: Arena | undefined;
  private templates: string[];
  private readonly templateBlocks: { [key: string]: BlockEntity };

  constructor(options: { slug: string }) {
    this.templates = [];
    this.contentUrl = options.slug
      ? `https://api.are.na/v2/channels/${options.slug}?sort=position&order=asc&per=100`
      : "";
    this.templateBlocks = {};
  }

  private async init() {
    this.data = await this.fetchContent();
    this.handleTemplate();
  }

  private async fetchContent(): Promise<Arena> {
    if (this.contentUrl === "") throw Error("no arena channel slug provided");
    return await fetch(this.contentUrl).then((data) => data.json());
  }

  private handleTemplate() {
    this.parseTemplateBlocks();
  }

  private parseTemplateBlocks() {
    this.templates = [
      "image",
      "text",
      "pdf",
      "videoEmbed",
      "videoFile",
      "audioFile",
      "audioEmbed",
    ];

    this.templates.forEach((temp) => {
      let tempClass = temp.replace(/[A-Z]/g, "-$&").toLowerCase();
      let tempName = temp.split(/[A-Z]/g)[0];
      tempName === "pdf"
        ? (tempName = tempName.toUpperCase())
        : (tempName = tempName[0].toUpperCase() + tempName.slice(1));

      let tempContainer = document.querySelector(
        `.${tempClass}-blocks`
      ) as HTMLDivElement;
      let tempTemplate = document.getElementById(
        `${tempClass}-block`
      ) as HTMLTemplateElement;

      this.templateBlocks[temp] = {
        name: tempName,
        container: tempContainer,
        template: tempTemplate ? tempTemplate.content : null,
      };
    });

    this.parseContent();
  }

  private parseContent() {
    this.data?.contents?.forEach((content) => {
      switch (content.class) {
        case "Image":
          this.renderContent(content, this.templateBlocks["image"]);
          break;
        case "Text":
          this.renderContent(content, this.templateBlocks["text"]);
          break;
      }
    });
  }

  private renderContent(dataBlock: ContentsEntity, tempBlock: BlockEntity) {
    if (!tempBlock.template || !tempBlock.container) return;
    let template = tempBlock.template.cloneNode(true) as HTMLElement;
    let categories = [
      "title",
      "image",
      "audio",
      "video",
      "link",
      "type",
      "content",
      "description",
      "descriptionHtml",
    ];

    let element = Object.assign(
      {},
      ...categories.map((type) => ({
        [type]: template.querySelector(
          `.${type.replace(/[A-Z]/g, "-$&").toLowerCase()}`
        ) as HTMLElement,
      }))
    );

    if (element.title)
      dataBlock.title
        ? (element.title.innerHTML = dataBlock.title)
        : element.title.remove();
    if (element.image)
      dataBlock.image
        ? (element.image.src = dataBlock.image.large.url)
        : element.image.remove();

    tempBlock.container.append(template);
  }
}

export { ArenaWebComponent };
