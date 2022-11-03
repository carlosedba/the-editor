import { compile } from 'handlebars'

export default {
  DND_EDITOR_SIDEBAR_BLOCK_SECAO: compile(`
    <section>{{{content}}}</section>
  `),

  DND_EDITOR_SIDEBAR_BLOCK_TITULO: compile(`
    <h2>{{content}}</h2>
  `),

  DND_EDITOR_SIDEBAR_BLOCK_TEXTO: compile(`
    <div>{{content}}</div>
  `),
  
  DND_EDITOR_SIDEBAR_BLOCK_LISTA_ICONES: compile(`
    <ul class="f22-lista-icones">
      {{#each content}}
        <li>
          <div class="f22-lista-icones__icon">
            {{{icon}}}
          </div>
          {{text}}
        </li>
      {{/each}}
    </ul>
  `),
  
  DND_EDITOR_SIDEBAR_BLOCK_BLOCOS_ICONES: compile(`
    <ul class="f22-blocos-destaque">
      {{#each content}}
        <li>
          <div class="f22-blocos-destaque__icon">
            {{{icon}}}
          </div>
          <div>
            {{text}}
          </div>
        </li>
      {{/each}}
    </ul>
  `),
  
  DND_EDITOR_SIDEBAR_BLOCK_BOTAO: compile(`
    <a class="f22-btn f22-btn--one" href="{{content.url}}">{{content.name}}</a>
  `),
  
  DND_EDITOR_SIDEBAR_BLOCK_YOUTUBE: compile(`
    <iframe src="https://www.youtube.com/embed/{{content.videoId}}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="allowfullscreen"></iframe>
  `),
  
  DND_EDITOR_SIDEBAR_BLOCK_BOX_CONHECER: compile(`
    <div class="f22-page-box f22-page-box--conhecer">
      <h1 class="f22-page-box__title">Quer conhecer mais?</h1>
      <div class="f22-page-box__content">
        <p>Preencha os campos abaixo para receber um material completo sobre o curso:</p>

        <div class="f22-inputs f22-inputs--style-1">
          <div class="f22-inputs__row">
            <div class="f22-input f22-input--w2-q2">
              <div class="f22-input__container">
                <input placeholder="Nome">
              </div>
            </div>
            <div class="f22-input f22-input--w2-q2">
              <div class="f22-input__container">
                <input placeholder="E-mail">
              </div>
            </div>

            <button class="f22-btn f22-btn--two">Enviar</button>
          </div>
        </div>
      </div>
    </div>
  `),
  
  DND_EDITOR_SIDEBAR_BLOCK_BOX_DESCONTOS: compile(`
    <div class="f22-page-box f22-page-box--politica">
      <h1 class="f22-page-box__title">Política de Desconto</h1>
      <p class="f22-page-box__subtitle">para ex-alunos, sindicatos e indústrias</p>
      <div class="f22-page-box__content">
        <p>A política de descontos para matrículas 2021 proporciona a diversos públicos bonificações nos cursos das entidades que compõe o Sistema Fiep.</p>
      </div>
    </div>
  `),
}