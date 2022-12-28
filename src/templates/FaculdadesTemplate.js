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

  DND_EDITOR_SIDEBAR_BLOCK_TEXTO_LEX: compile(`
    {{{content.html}}}
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
  
  DND_EDITOR_SIDEBAR_BLOCK_LISTA_ICONES_LEX: compile(`
    <ul class="f22-lista-icones">
      {{#each content}}
        <li>
          <div class="f22-lista-icones__icon">
            {{{icon}}}
          </div>
          {{{html}}}
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
  
  DND_EDITOR_SIDEBAR_BLOCK_BLOCOS_ICONES_LEX: compile(`
    <ul class="f22-blocos-destaque">
      {{#each content}}
        <li>
          <div class="f22-blocos-destaque__icon">
            {{{icon}}}
          </div>
          <div>
            {{{html}}}
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
  
  DND_EDITOR_BLOCK_MODAL_INSCRICAO: compile(`
    <div class="multi-modal-container">
      <div class="multi-modal-overlay"></div>

      <div class="multi-modal f22-modal" data-name="Inscricao" data-status="closed">
        <div class="svg svg--height multi-modal__close f22-modal__close">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25-6.2 6.25-14.4 9.35-22.6 9.35s-16.38-3.125-22.62-9.375L160 301.3 54.63 406.6C48.38 412.9 40.19 416 32 416s-16.37-3.1-22.625-9.4c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/>
          </svg>
        </div>
        <div class="f22-modal__header">
          <p class="f22-modal__hat">{{content.tipoCurso}} em {{content.nomeCurso}}</p>
          <h1 class="f22-modal__title">Escolha sua forma de inscrição:</h1>
        </div>
        <div class="f22-modal__content">
          {{#if content.linkInscricaoVestibularTradicional}}
            <a class="f22-btn f22-btn--four" href="{{content.linkInscricaoVestibularTradicional}}" target="_blank">Inscrição para Vestibular Tradicional</a>
          {{/if}}
          {{#if content.linkInscricaoVestibularOnline}}
            <a class="f22-btn f22-btn--four" href="{{content.linkInscricaoVestibularOnline}}" target="_blank">Inscrição para Vestibular Online</a>
          {{/if}}
          {{#if content.linkInscricaoBolsaEnem}}
            <a class="f22-btn f22-btn--four" href="{{content.linkInscricaoBolsaEnem}}" target="_blank">Inscrição via Bolsa do ENEM</a>
          {{/if}}
          {{#if content.linkInscricaoTransferencia}}
            <a class="f22-btn f22-btn--four" href="{{content.linkInscricaoTransferencia}}" target="_blank">Inscrição via Transferência</a>
          {{/if}}
          {{#if content.linkInscricaoPortadorDiploma}}
            <a class="f22-btn f22-btn--four" href="{{content.linkInscricaoPortadorDiploma}}" target="_blank">Inscrição para Portador de Diploma</a>
          {{/if}}
        </div>
      </div>
    </div>
  `),
  
  DND_EDITOR_SIDEBAR_BLOCK_QR_CODE_CAMPUS: compile(`
    <div class="f22-e-mec">
      <a href="https://emec.mec.gov.br/emec/consulta-cadastro/detalhamento/d96957f455f6405d14c6542552b0f6eb/MTQ3ODQ=" target="_blank">
        <img src="https://www.faculdadesdaindustria.org.br/layout/img/qrcodes/campus.png">
      </a>
      <p><b>Consulte aqui</b> o cadastro de nossa instituição no <b>Sistema e-MEC</b>.</p>
    </div>
  `),
  
  DND_EDITOR_SIDEBAR_BLOCK_QR_CODE_CIC: compile(`
    <div class="f22-e-mec">
      <a href="https://emec.mec.gov.br/emec/consulta-cadastro/detalhamento/d96957f455f6405d14c6542552b0f6eb/MTM2Nzc=" target="_blank">
        <img src="https://www.faculdadesdaindustria.org.br/layout/img/qrcodes/cic.png">
      </a>
      <p><b>Consulte aqui</b> o cadastro de nossa instituição no <b>Sistema e-MEC</b>.</p>
    </div>
  `),
  
  DND_EDITOR_SIDEBAR_BLOCK_QR_CODE_SJP: compile(`
    <div class="f22-e-mec">
      <a href="https://emec.mec.gov.br/emec/consulta-cadastro/detalhamento/d96957f455f6405d14c6542552b0f6eb/MTQwMA==" target="_blank">
        <img src="https://www.faculdadesdaindustria.org.br/layout/img/qrcodes/sjp.png">
      </a>
      <p><b>Consulte aqui</b> o cadastro de nossa instituição no <b>Sistema e-MEC</b>.</p>
    </div>
  `),
  
  DND_EDITOR_SIDEBAR_BLOCK_QR_CODE_LONDRINA: compile(`
    <div class="f22-e-mec">
      <a href="https://emec.mec.gov.br/emec/consulta-cadastro/detalhamento/d96957f455f6405d14c6542552b0f6eb/MTQ3ODY=" target="_blank">
        <img src="https://www.faculdadesdaindustria.org.br/layout/img/qrcodes/londrina.png">
      </a>
      <p><b>Consulte aqui</b> o cadastro de nossa instituição no <b>Sistema e-MEC</b>.</p>
    </div>
  `),
}