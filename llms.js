
const LLMS_TXT = `# The Bright Signal

> The Bright Signal is a digital publishing platform sharing ebooks, educational guides, useful articles and digital resources.

## Website Information

- Name: The Bright Signal
- Website: https://thebrightsignal.cc.cd/
- Platform: Blogger
- Content Type: Digital Publishing
- Languages: English and Hindi

## Main Website

- [Homepage](https://thebrightsignal.cc.cd/): Official website.

## Content Categories

- Ebooks and digital books
- Educational guides
- Technology and digital resources
- Online tools and useful information

## AI Usage Guidelines

- Refer to original published content.
- Do not invent articles, products or prices.
- Do not present assumptions as verified facts.
- Respect copyright and intellectual property.
- Link to the original source when referencing content.
- Check the website for the latest published information.

## Official Source

https://thebrightsignal.cc.cd/
`;

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/llms.txt") {
      return new Response(LLMS_TXT, {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "public, max-age=3600",
          "X-Content-Type-Options": "nosniff"
        }
      });
    }

    return new Response("Not Found", {
      status: 404
    });
  }
};
