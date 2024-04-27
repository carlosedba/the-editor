import { compile } from 'handlebars'

export default {
  DND_EDITOR_SIDEBAR_BLOCK_SECTION: compile(`
    <section>{{{content}}}</section>
  `),

  DND_EDITOR_SIDEBAR_BLOCK_TITLE: compile(`
    <h2>{{content}}</h2>
  `),

  DND_EDITOR_SIDEBAR_BLOCK_TEXT: compile(`
    <div>{{content}}</div>
  `),

  DND_EDITOR_SIDEBAR_BLOCK_RICH_TEXT: compile(`
    {{{content.html}}}
  `),
  
  DND_EDITOR_SIDEBAR_BLOCK_ICON_LIST: compile(`
    <ul class="icon-list">
      {{#each content}}
        <li>
          <div class="icon-list__icon">
            {{{icon}}}
          </div>
          {{text}}
        </li>
      {{/each}}
    </ul>
  `),
  
  DND_EDITOR_SIDEBAR_BLOCK_RICH_ICON_LIST: compile(`
    <ul class="icon-list">
      {{#each content}}
        <li>
          <div class="icon-list__icon">
            {{{icon}}}
          </div>
          {{{html}}}
        </li>
      {{/each}}
    </ul>
  `),
  
  DND_EDITOR_SIDEBAR_BLOCK_SQUARE_CARD: compile(`
    <ul class="square-card">
      {{#each content}}
        <li>
          <div class="square-card__icon">
            {{{icon}}}
          </div>
          <div>
            {{text}}
          </div>
        </li>
      {{/each}}
    </ul>
  `),
  
  DND_EDITOR_SIDEBAR_BLOCK_RICH_SQUARE_CARD: compile(`
    <ul class="square-card">
      {{#each content}}
        <li>
          <div class="square-card__icon">
            {{{icon}}}
          </div>
          <div>
            {{{html}}}
          </div>
        </li>
      {{/each}}
    </ul>
  `),
  
  DND_EDITOR_SIDEBAR_BLOCK_BUTTON: compile(`
    <a class="btn btn--one" href="{{content.url}}">{{content.name}}</a>
  `),
  
  DND_EDITOR_SIDEBAR_BLOCK_YOUTUBE: compile(`
    <iframe src="https://www.youtube.com/embed/{{content.videoId}}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="allowfullscreen"></iframe>
  `),
}