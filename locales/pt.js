// Locales: PT
(function () {
  globalThis.MXM_LOCALES = globalThis.MXM_LOCALES || {};
  globalThis.MXM_LOCALES.pt = {
    mesesAbrev: ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"],
    diasSemanaAbrev: ["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"],
    strings: {
      envioRegistrado: 'Envio registrado',
      reenvioRegistrado: 'Reenvio registrado',
      instrumentalMarcado: 'Instrumental marcado',
      instrumentalAtualizado: 'Instrumental atualizado',
      id: 'Abstrack',
      manual: 'manual',
      tentativa: 'tentativa',
      as: 'às',
      logDeEnvios: 'Echoform',
      integracaoPayflowTitulo: 'Echoform + Payflow',
      integracaoPayflowTexto:
        'Detectamos as duas extensões ativas no Curators Studio. Ative a integração para ver os ganhos em USD/BRL direto no seu log de envios.',
      integracaoPayflowBadge: 'Nova integração disponível',
      integracaoPayflowFeature1: 'Valores da missão puxados automaticamente pro log',
      integracaoPayflowFeature2: 'Cotação ao vivo sincronizada nos dois painéis',
      integracaoPayflowFeature3: 'Sem duplicar cálculo — uma única fonte de verdade',
      integracaoPayflowBotaoAtivar: 'Ativar integração',
      integracaoPayflowBotaoAgoraNao: 'Agora não',
      sobreTitulo: 'Sobre o Echoform',
      sobreDescricao:
        'Echoform é uma extensão independente e sem fins lucrativos, feita por um curador para ajudar outros curadores a organizar e acompanhar o próprio tempo e atividade no Musixmatch Studio. Não usa, acessa nem se conecta à API oficial da Musixmatch — só lê informações já exibidas na tela pelo navegador do próprio usuário. Código aberto, disponível no GitHub.',
      sobreLinkGithub: 'Ver código-fonte no GitHub',
      tabsV3Titulo: 'Tabs V3',
      tabsV3Subtitulo: 'Novo layout, mesmo ritmo do Echoform.',
      tabsV3Changelog: [
        'Ícone novo para o tema do painel, na mesma paleta do Echoform.',
        'Ajustes finos de cor e espaçamento nas superfícies tonais.',
        'Base pronta para os próximos esquemas de cor (beta).',
      ],
      detalhado: 'Detalhado',
      buscarPlaceholder: 'Buscar por título, artista ou ID...',
      limparBusca: 'Limpar busca',
      // aviso mostrado acima da barra de busca nos últimos dias do
      // mês, lembrando de revisar/fechar o resumo do que foi feito em
      // Reward antes do mês virar.
      avisoFimMesTextoPlural: 'Faltam {dias} dias para o fim do mês — que tal revisar o resumo do que foi feito em Reward?',
      avisoFimMesTextoSingular: 'Falta 1 dia para o fim do mês — que tal revisar o resumo do que foi feito em Reward?',
      avisoFimMesTextoHoje: 'Hoje é o último dia do mês — não esqueça de revisar o resumo do que foi feito em Reward.',
      avisoFimMesVerResumo: 'Ver resumo',
      avisoFimMesSuspender: 'Suspender',
      avisoFimMesSuspensoToast: 'Aviso suspenso até o próximo mês.',
      // banner animado (grade de capas do mês subindo ao fundo)
      // entre as bolinhas do carrossel Hoje/Recorde e "Ferramentas úteis",
      // só nas últimas horas do último dia do mês (ver deveMostrarAvisoResumoMes).
      avisoResumoMesTitulo: 'Resumo de {mes} quase fechando',
      avisoResumoMesTexto: 'Faltam só algumas horas pro mês virar — dá uma espiada em tudo que você enviou.',
      tarefasHoje: 'Tarefas hoje',
      tarefasEnviadasHoje: 'tarefas enviadas hoje',
      emRelacaoAoDiaAnterior: 'em relação a ontem',
      semMudancaOntem: 'Sem mudança em relação a ontem',
      recorde: 'Recorde',
      nenhumAinda: 'nenhum ainda',
      em: 'em',
      tarefa: 'tarefa',
      nenhumEnvioEncontrado: 'Nenhum envio encontrado.',
      // V3.4.82: marcador "Fim da lista" logo abaixo da última entrada —
      // ver renderPainelLista. Ocupa espaço real no fluxo (não é padding
      // nem scroll-margin, já tentados e revertidos na v3.4.78/79), então
      // a última música nunca fica colada em nada, e some junto quando a
      // lista está vazia/sem resultado de busca.
      fimDaLista: 'Fim da lista',
      dicasListaCurtaTitulo: 'Enquanto isso, algumas dicas',
      // estado vazio "de verdade" da lista (log sem nenhum envio,
      // sem filtro de busca aplicado) — convite pra importar um backup em
      // vez de só dizer que está vazio (ver renderPainelLista).
      logVazioTitulo: 'Ainda não há nenhum envio registrado aqui.',
      logVazioDescricao:
        'Se você já usava a extensão antes (em outro computador, navegador, ou depois de reinstalar), pode importar um backup pra recuperar seu histórico agora.',
      logVazioImportarLocal: 'Importar backup (arquivo)',
      logVazioImportarNuvem: 'Importar da nuvem',
      // selo mostrado perto das ações de backup na nuvem, indicando
      // que a ação pede login com a conta Google (ver mxmFirebaseGarantirAuth).
      nuvemRequerGoogle: 'Requer login com sua conta Google',
      instrumentalTag: 'Instrumental',
      instrumentalTagTooltip: 'Clique pra uma curiosidade sobre instrumentais',
      manualTag: 'Manual',
      semDetalhesTitulo: 'Sem detalhes',
      semDetalhesTag: 'Sem detalhes',
      semDetalhesTagTooltip: 'Não deu pra identificar o título/artista deste envio. Clique pra completar manualmente.',
      envioSemDetalhesToast: 'Envio registrado sem título/artista. Clique na música no log pra completar.',
      editarDetalhesTitulo: 'Completar detalhes do envio',
      editarDetalhesTituloMensagem: 'Qual é o título da música?',
      editarDetalhesTituloPlaceholder: 'Título da música',
      editarDetalhesArtistaMensagem: 'E o artista?',
      editarDetalhesArtistaPlaceholder: 'Artista (opcional)',
      detalhesAdicionadosToast: 'Detalhes adicionados ao envio.',
      // V3.4.65: toast mostrado quando o usuário cancela logo no
      // primeiro passo (título) da cadeia aberta pelo botão "+" — a
      // entrada em branco criada é apagada e toda a cadeia é encerrada.
      novaEntradaCanceladaToast: 'Criação da nova música cancelada.',
      // V3.4.34: edição manual de data/hora de um envio, clicando
      // diretamente na hora mostrada na linha do log principal.
      editarDataHoraTitulo: 'Alterar data e hora',
      editarDataHoraMensagem: 'Ajuste quando este envio foi registrado.',
      editarDataHoraDataLabel: 'Data',
      editarDataHoraHoraLabel: 'Hora',
      editarDataHoraToast: 'Data e hora atualizadas.',
      editarDataHoraErro: 'Preencha uma data e hora válidas.',
      // V3.4.35: painel único da música, aberto ao clicar em qualquer
      // área da linha no log principal (alvo grande — sem precisar
      // acertar um ícone pequeno). Reúne letra, data/hora, duração e
      // missão num só lugar, com data/hora e missão editáveis ali mesmo.
      painelMusicaDataHoraLabel: 'Data e hora',
      painelMusicaEditarDataHoraTitulo: 'Alterar',
      painelMusicaDuracaoLabel: 'Duração',
      painelMusicaDuracaoIndisponivel: 'Não disponível',
      painelMusicaMissaoLabel: 'Missão',
      painelMusicaEditarMissaoTitulo: 'Alterar',
      painelMusicaLetraLabel: 'Letra',
      painelMusicaVerLetra: 'Ver letra completa',
      painelMusicaSemLetra: 'Nenhuma letra capturada neste envio.',
      painelMusicaAdicionarLetra: 'Adicionar letra',
      painelMusicaCopiarIdTitulo: 'Copiar Abstrack',
      painelMusicaIdCopiadoToast: 'Abstrack copiado.',
      painelMusicaAbrirPaginaLabel: 'Página da música',
      painelMusicaAbrirPaginaValor: 'Ver no Musixmatch',
      painelMusicaAbrirPaginaTitulo: 'Abrir a página desta música',
      painelMusicaAbrirPaginaErro: 'Não foi possível abrir a página desta música.',
      painelMusicaAbrirStudioLabel: 'Abrir no Studio',
      painelMusicaAbrirStudioValor: 'Ver no Curators Studio',
      painelMusicaAbrirStudioTitulo: 'Abrir esta música no Curators Studio',
      painelMusicaAbrirStudioErro: 'Não foi possível abrir esta música no Studio.',
      ativarTemaClaro: 'Ativar tema claro',
      voltarTemaEscuro: 'Voltar ao tema escuro',
      // rótulo do interruptor de tema claro nas Configurações.
      temaClaro: 'Tema claro',
      // sistema de notificações no cabeçalho do painel principal
      // (sino perto do avatar) — reúne aviso de atualização, resumo mensal
      // pronto, lembrete de backup na nuvem e dicas rotativas de funções.
      notificacoes: 'Notificações',
      notificacoesNenhuma: 'Nenhuma notificação por enquanto.',
      notificacoesMarcarLidas: 'Marcar tudo como lido',
      notificacoesDispensar: 'Dispensar',
      notifUpdateTitulo: 'Nova versão disponível',
      notifResumoMensalTitulo: 'Resumo do mês pronto',
      notifResumoMensalDesc: 'O resumo de {mes} já pode ser conferido e salvo.',
      notifResumoMensalAcao: 'Ver resumo',
      notifBackupAutoTitulo: 'Backup automático salvo',
      notifBackupAutoDesc: 'Uma cópia do seu histórico foi salva em Downloads/MXMBackups em {data}.',
      notifBackupAutoAcao: 'Saber mais',
      notifBackupNuvemTitulo: 'Ative o backup na nuvem',
      notifBackupNuvemDesc: 'Seu histórico só existe neste navegador. Ative o backup na nuvem pra não perder nada.',
      notifBackupNuvemAcao: 'Ativar backup',
      // V3.5.52: avisa sobre o novo painel "Backup e Restauração".
      notifNovidadeBackupTitulo: 'Novidade: painel de Backup e Restauração',
      notifNovidadeBackupDesc:
        'Agora todos os seus backups (arquivo, disco, nuvem e texto) ficam reunidos num só lugar, dentro de Ferramentas úteis.',
      notifNovidadeBackupAcao: 'Ver painel',
      notifDicaTitulo: 'Dica',
      notifDicaTemas: 'Você pode trocar entre vários esquemas de cor do Tabs V3 (e até um tema claro) nas Configurações.',
      notifDicaDiffCheck: 'O Diff Check compara a letra da tela atual com a versão anterior — ótimo pra achar o que mudou antes de reenviar.',
      notifDicaCopiarLetra: 'Dá pra copiar a letra inteira da música com um clique, direto da tela de Transcrição ou Sincronização.',
      notifDicaSons: 'Se os bipes de clique/sucesso/erro incomodam, dá pra desligar os efeitos sonoros nas Configurações.',
      notifDicaDiffManual: 'O "Diff manual" deixa comparar duas letras quaisquer coladas por você, sem precisar estar numa música específica.',
      notifDicaResumoDia: 'A barrinha "Hoje vs Recorde" no painel Detalhado mostra o quanto falta pra bater seu recorde diário.',
      // dicas pra quem está começando — sem ação (gestos direto na lista) ou
      // com botão pra abrir a ferramenta citada.
      notifDicaClicarMusica: 'Clique em qualquer música da lista pra abrir o painel dela: dá pra ver e corrigir data/hora, missão, letra e duração, e ir direto pra página da música.',
      notifDicaBotaoDireitoMissao: 'Clique com o botão direito numa música da lista pra escolher (ou corrigir) em que missão ela foi feita.',
      notifDicaPreviaCapa: 'Clique na capinha de uma música pra ouvir uma prévia de 30 segundos — ótimo pra lembrar qual era a faixa. (Precisa de "Mostrar imagem" ligado nas Configurações.)',
      notifDicaModoManual: 'Esqueceu de registrar uma música? Ligue o "Modo marcação manual" no botão flutuante: com ele ligado, clicar numa linha da lista de tasks registra a letra, e Shift+clique registra como instrumental.',
      notifDicaSelecionarVarias: 'Pra apagar várias músicas de uma vez, use "Selecionar várias" no botão flutuante, marque as que quiser e confirme a exclusão no rodapé.',
      notifDicaSemDetalhes: 'Viu a etiqueta "Sem detalhes" numa música? Foi porque o título/artista não foram identificados. Clique nela pra preencher na mão.',
      notifDicaMusicaVazia: 'Precisa registrar uma música que não foi capturada? Use o botão "+" ao lado do funil pra criar uma linha vazia e depois clique nela pra completar título e artista.',
      notifDicaOrdenar: 'O botão de funil ao lado da primeira data deixa ordenar o log por data, por missão ou em ordem alfabética.',
      notifDicaBusca: 'A barra de busca procura por título, artista ou ID da música — bom pra achar rapidinho um envio antigo.',
      notifDicaRecolherGrupos: 'Clique na etiqueta de data (ou de missão) que separa a lista pra recolher aquele grupo e deixar o log mais enxuto. Clique de novo pra expandir.',
      notifDicaRedimensionar: 'A janela do Log é redimensionável: arraste o cantinho de baixo à direita pra deixá-la do tamanho que ficar melhor pra você.',
      notifDicaCiclos: 'No painel Ciclos você vê cada ciclo de missões do ano, com nome (dá pra renomear), datas, quantidade de músicas e valores em USD e BRL.',
      notifDicaReward: 'A aba Reward mostra quanto você ganhou no total e o reward estimado por missão, em dólar e em real.',
      notifDicaBlocoDeNotas: 'O Bloco de notas guarda anotações suas, e cada nota pode ser ligada a uma música ou a um ciclo — bom pra lembrar de algo pra depois.',
      notifDicaBackup: 'Seu histórico fica só neste navegador. No painel Backup e Restauração dá pra guardar cópias em arquivo, em disco ou na nuvem, pra não perder nada se reinstalar ou trocar de computador.',
      notifDicaComparar: 'Em Comparar você importa o arquivo .json de outra pessoa e vê seu log lado a lado com o dela: total de envios, duração média e dias ativos.',
      notifDicaConquistas: 'Existe um sistema de conquistas (badges por marcos, como quantidade de músicas e dias seguidos). Ele vem desligado por padrão — dá pra ligar nas Configurações.',
      notifDicaCronometroCiclo: 'Dá pra mostrar uma contagem regressiva até o próximo ciclo de missões abaixo da barra de busca — ligue nas Configurações.',
      // notificação fixa explicando o que é o "ciclo de missões" e por que
      // uma missão específica pode terminar antes do fim do mês (ver
      // abrirExplicacaoCiclosMissoes, aberta também pela janela do
      // cronômetro do próximo ciclo).
      notifCicloMissoesTitulo: 'Ciclos de missões',
      notifCicloMissoesDesc: 'O que é isso? Veja como funciona a virada do ciclo e o prazo de cada missão.',
      notifCicloMissoesAcao: 'Saiba mais',
      cicloMissoesPopupTitulo: 'O que são os ciclos de missões?',
      cicloMissoesPopupIntro:
        'O cronômetro do próximo ciclo mostra a virada mensal do log desta extensão — ela acontece automaticamente às 21h (horário de Brasília) do último dia do mês.',
      cicloMissoesPopupPonto1:
        'Esse ciclo do log só decide em qual mês uma música enviada é contabilizada aqui no seu histórico — é fixo e sempre dura o mês inteiro.',
      cicloMissoesPopupPonto2:
        'Já as missões da Musixmatch (as que aparecem nos cards do site) têm prazo próprio: cada uma recebe sua própria data de início e de expiração quando é liberada pra você, não necessariamente alinhada ao calendário do mês.',
      cicloMissoesPopupPonto3:
        'Por isso é comum uma missão específica sumir da tela alguns dias antes do fim do mês — o prazo dela é curto e independente da virada do ciclo do log, mesmo estando dentro do mesmo mês.',
      cicloMissoesPopupPonto4:
        'Resumindo: este cronômetro mostra a virada do MÊS; o prazo de cada missão pode terminar antes disso — fique de olho nos cards de missão do próprio site pra saber quando cada uma expira de verdade.',
      cicloMissoesDiagramaLog: 'Ciclo do log',
      cicloMissoesDiagramaLogLegenda: 'sempre o mês inteiro',
      cicloMissoesDiagramaMissao: 'Prazo da missão',
      cicloMissoesDiagramaMissaoLegenda: 'pode acabar antes',
      cicloMissoesDiagramaDia1: 'dia 1',
      cicloMissoesDiagramaFimMes: '21h · fim do mês',
      cicloMissoesPopupBotao: 'Entendi',
      abrirLogDetalhado: 'Abrir Log Detalhado',
      abrirDiffCheckAcao: 'Abrir Diff Check',
      abrirDiffManualAcao: 'Abrir Diff manual',
      abrirCiclosAcao: 'Abrir Ciclos',
      abrirRewardAcao: 'Abrir Reward',
      abrirBlocoDeNotasAcao: 'Abrir Bloco de notas',
      abrirBackupAcao: 'Abrir Backup e Restauração',
      abrirCompararAcao: 'Abrir Comparar',
      // badge da lista pra registros com letra completa capturada,
      // e textos do visualizador que abre ao clicar nela.
      letraCapturadaTag: 'Letra',
      letraCapturadaTooltip: 'Letra completa capturada — clique pra ver',
      letraSuspeitaTooltip: 'A letra capturada contém um termo que sugere possível erro (ex: "Undetermined", "English", "Portuguese", "Reward" ou "task completed") — vale a pena conferir.',
      confirmarFalsoPositivoLetraTitulo: 'Marcar como falso positivo?',
      confirmarFalsoPositivoLetraMensagem: 'A letra continua contendo o termo suspeito, mas o aviso deixará de aparecer para este registro. Você poderá conferir a letra a qualquer momento clicando na tag.',
      confirmarFalsoPositivoLetraBotao: 'Marcar',
      falsoPositivoLetraMarcado: 'Aviso removido — marcado como falso positivo.',
      verLetraTitulo: 'Letra completa',
      copiarLetra: 'Copiar',
      letraCopiada: 'Letra copiada!',
      // tamanho (em bytes) da letra mostrada no visualizador.
      tamanhoLetra: 'Tamanho',
      // indicador de uso de memória interna nas Configurações.
      usoMemoriaInterna: 'Memória interna usada',
      usoMemoriaDetalhe: '{tamanho} · {n} registro(s) salvo(s)',
      exportarTxt: 'Exportar .txt',
      limparTudo: 'Limpar tudo',
      hoje: 'Hoje',
      ontem: 'Ontem',
      remover: 'Remover',
      logDetalhado: 'Log Detalhado',
      hojeVsRecorde: 'Hoje vs Recorde',
      progressoRecorde: 'Progresso até o recorde',
      musicasPorMissao: 'Músicas por missão',
      filtroTotal: 'Total',
      filtroCicloAtual: 'Ciclo atual',
      proximoCicloTitulo: 'Próximo ciclo em',
      proximoCicloDescricao: 'Novo ciclo de missões começa às 21h (horário de Brasília)',
      cronometroEstiloSiteLabel: 'contagem do site',
      cronometroEstiloSiteTooltip:
        'Como a Musixmatch mostra prazos de missão nos cards (ex.: "29 days") — esse número só muda uma vez por dia, às 9h, ao contrário do cronômetro em tempo real acima.',
      // ícone de pino nas tiles do carrossel Hoje/Recorde, pra
      // travar numa delas sem ficar girando sozinho.
      resumoFixarSlide: 'Fixar aqui (parar de girar sozinho)',
      resumoDesfixarSlide: 'Desfixar (voltar a girar sozinho)',
      // V3.4.64: setas circulares de navegação do carrossel do resumo.
      resumoSetaAnterior: 'Slide anterior',
      resumoSetaProxima: 'Próximo slide',
      cronometroCicloMainAtivar: 'Cronômetro do ciclo no carrossel',
      cronometroCicloMainDescricao: 'Mostra a contagem regressiva até o próximo ciclo de missões, abaixo da barra de busca.',
      // popup único (some pra sempre depois de visto) que aparece
      // apontando pro ícone de pino na primeira vez que o painel abre com a
      // tile do cronômetro já fixada por padrão.
      popupPinoCronometroTitulo: 'Contagem regressiva fixada aqui',
      popupPinoCronometroMensagem: 'Deixamos essa tile ligada e fixada por padrão, pra sempre aparecer. Clique de novo no pino pra desfixar e voltar a girar entre as tiles.',
      popupPinoCronometroBotao: 'Entendi',
      nenhumRegistroAinda: 'Nenhum registro ainda.',
      semMissaoIdentificada: 'Sem missão identificada',
      duracaoDasFaixas: 'Duração das faixas',
      maisCurta: 'Mais curta',
      maisLonga: 'Mais longa',
      nenhumaFaixaComDuracao:
        'Nenhuma faixa com duração registrada ainda (só vale pros próximos envios a partir de agora).',
      horarioDePico: 'Horário de pico (por hora do dia)',
      // V3.5.0: sequência de dias seguidos enviando algo, distribuição
      // por dia da semana, ritmo entre envios numa sessão e evolução da
      // duração média das faixas — 4 métricas novas do painel Detalhado.
      sequenciaTitulo: 'Sequência de envios',
      sequenciaAtualLabel: 'Atual',
      sequenciaRecordeLabel: 'Recorde',
      progressoSequenciaRecorde: 'Progresso até o recorde',
      distribuicaoDiaSemanaTitulo: 'Distribuição por dia da semana',
      ritmoEnvioTitulo: 'Ritmo entre envios (mesma sessão)',
      ritmoDadosInsuficientes: 'Ainda não há envios suficientes numa mesma sessão pra calcular o ritmo.',
      ritmoBaseadoEm: 'com base em {n} intervalos, em {sessoes} sessões de trabalho',
      evolucaoDuracaoTitulo: 'Evolução da duração média das faixas',
      evolucaoDuracaoDadosInsuficientes: 'Ainda não há duração suficiente registrada nesse período pra comparar.',
      evolucaoDuracaoEstavel: 'Duração média estável nos últimos meses',
      evolucaoDuracaoMaisCurtas: 'Faixas {tempo} mais curtas, em média, do que em {mes}',
      evolucaoDuracaoMaisLongas: 'Faixas {tempo} mais longas, em média, do que em {mes}',
      // janela de personalizar seções do painel Log Detalhado (mostrar/
      // ocultar e reordenar cada métrica arrastando).
      personalizarPainelDetalhado: 'Personalizar seções',
      personalizarPainelDetalhadoTitulo: 'Personalizar painel',
      personalizarPainelDetalhadoDescricao: 'Escolha o que aparece aqui e arraste pelo ícone ⠿ pra mudar a ordem.',
      personalizarSecaoMostrar: 'Mostrar seção',
      personalizarSecaoOcultar: 'Ocultar seção',
      personalizarRestaurarPadrao: 'Restaurar padrão',
      personalizarConcluido: 'Concluído',
      personalizarTodasOcultas: 'Todas as seções foram ocultadas — ative pelo menos uma pra ver alguma coisa aqui.',
      arrastarParaReordenar: 'Arraste pra reordenar',
      moverParaCima: 'Mover pra cima',
      moverParaBaixo: 'Mover pra baixo',
      // aviso no rodapé do painel detalhado — deixa claro que os
      // números vêm só do log local da extensão, não da Musixmatch.
      avisoDadosLocais:
        'Todos os dados desta página são estimados a partir do log capturado localmente por esta extensão — não vêm dos servidores do MXM, de suas APIs protegidas ou de parceiros. Alguns números podem ser imprecisos; use como referência, não como verdade absoluta.',
      atividadePorDia: 'Atividade da semana',
      atividadePorMes: 'Atividade por mês',
      mesAtualVsAnterior: 'Mês atual vs anterior',
      comparativoPeriodo: 'Comparativo do período',
      mesAtual: 'Mês atual',
      mesAnterior: 'Mês anterior',
      emRelacaoAoMesAnterior: 'em relação ao mês anterior',
      semMudanca: 'Sem mudança em relação ao mês anterior',
      semDadosMesAnterior: 'Sem dados do mês anterior pra comparar',
      // modo "Ciclo" do comparativo do período — mesma comparação,
      // mas usando o ciclo de missão (virada às 21h de Brasília,
      // chaveCicloAtual/chaveCicloDaEntrada) em vez do mês de calendário.
      modoComparacaoMensal: 'Mensal',
      modoComparacaoCiclo: 'Ciclo',
      cicloAnterior: 'Ciclo anterior',
      emRelacaoAoCicloAnterior: 'em relação ao ciclo anterior',
      semMudancaCiclo: 'Sem mudança em relação ao ciclo anterior',
      semDadosCicloAnterior: 'Sem dados do ciclo anterior pra comparar',
      diaVsDiaEquivalente: 'Hoje vs mesmo dia do mês passado',
      diaEquivalenteMesPassado: 'Mesmo dia (mês passado)',
      emRelacaoAoDiaEquivalente: 'em relação ao mesmo dia do mês passado',
      semDadosDiaEquivalente: 'Sem dados do dia equivalente pra comparar',
      mostrarNumeroEnvios: 'Mostrar número de envios no ícone',
      mostrarImagem: 'Mostrar imagem das músicas no log',
      ativarAnimacoes: 'Animações de abertura e gráficos',
      ativarSons: 'Efeitos sonoros da interface',
      notificarPeloWindows: 'Notificar pelo Windows (desativa o popup da extensão)',
      esquemaDestaque: 'Esquema de destaque',
      esquemaFundo: 'Esquema de fundo',
      esquemaCorRoxo: 'Roxo',
      esquemaCorAzul: 'Azul',
      esquemaCorVerde: 'Verde',
      esquemaCorRosa: 'Rosa',
      esquemaCorLaranja: 'Laranja',
      esquemaCorVermelho: 'Vermelho',
      esquemaCorCiano: 'Ciano',
      esquemaCorAmarelo: 'Amarelo',
      esquemaCorCoral: 'Coral',
      esquemaCorLima: 'Lima',
      esquemaCorEsmeralda: 'Esmeralda',
      esquemaCorIndigo: 'Índigo',
      esquemaCorVioleta: 'Violeta',
      esquemaCorMagenta: 'Magenta',
      esquemaFundoNeutro: 'Neutro',
      esquemaFundoQuente: 'Quente',
      esquemaFundoFrio: 'Frio',
      esquemaFundoVerde: 'Verde',
      esquemaFundoRosa: 'Rosa',
      esquemaFundoAzul: 'Azul',
      esquemaFundoRoxo: 'Roxo',
      esquemaFundoPreto: 'Preto puro (AMOLED)',
      esquemaFundoVinho: 'Vinho',
      esquemaFundoAreia: 'Areia',
      esquemaFundoMenta: 'Menta',
      esquemaFundoOceano: 'Oceano',
      esquemaFundoAmeixa: 'Ameixa',
      escolhaTemaTitulo: 'Escolha seu tema',
      escolhaTemaMensagem: 'Isso aparece só uma vez — dá pra trocar quando quiser depois, nas Configurações.',
      escolhaTemaConfirmar: 'Confirmar',
      escolhaTemaUsarPadrao: 'Usar padrão',
      termosTitulo: 'Termos de uso e avisos legais',
      termosMensagemIntro: 'Antes de continuar, leia com atenção os avisos abaixo.',
      termosParagrafo1:
        'Natureza do projeto: esta é uma extensão independente e sem fins lucrativos, desenvolvida por um curador para auxiliar outros curadores a organizar e acompanhar seu próprio tempo e atividade dentro do Musixmatch Studio.',
      termosParagrafo2:
        'Funcionamento: a extensão não utiliza, acessa ou se conecta à API oficial da Musixmatch. Todo o seu funcionamento se limita à leitura e à medição de informações já exibidas na tela pelo navegador do próprio usuário, sem interceptar, automatizar ou alterar o envio de conteúdo em nome do curador. Não foi desenvolvida com o propósito de fraudar, burlar ou conceder qualquer vantagem indevida nos processos de curadoria ou premiação da plataforma.',
      termosParagrafo3:
        'Isenção de responsabilidade: o uso desta extensão é de inteira responsabilidade do usuário. O desenvolvedor não se responsabiliza por eventual mau uso da ferramenta, por decisões tomadas com base nas informações exibidas, nem por quaisquer consequências, penalidades, suspensões ou perdas decorrentes do uso da extensão.',
      termosParagrafo4:
        'Marcas registradas: "Musixmatch", seu logotipo e demais marcas relacionadas são de propriedade exclusiva da Musixmatch. Esta extensão não é um produto oficial, não é afiliada, patrocinada ou endossada pela empresa — é um projeto independente feito apenas para ajudar o curador a gerenciar melhor seu tempo na plataforma.',
      termosLinkEula: 'Termos de Uso (EULA) da Musixmatch',
      termosLinkSuporte: 'Central de Ajuda da Musixmatch',
      termosCheckboxLabel: 'Li e concordo com os termos e avisos acima.',
      termosBotaoAceitar: 'Aceitar e continuar',
      termosBotaoRecusar: 'Não aceito',
      termosRecusaTitulo: 'Termos não aceitos',
      termosRecusaMensagem:
        'Sem a concordância com os termos acima, não é possível usar esta extensão. Este painel será fechado agora.',
      termosRecusaBotaoFechar: 'Fechar',
      boasVindasIdiomaTitulo: 'Escolha seu idioma',
      boasVindasIdiomaMensagem: 'Em qual idioma você quer usar a extensão?',
      boasVindasNomeTitulo: 'Como podemos te chamar?',
      boasVindasNomeMensagem: 'Esse nome substitui "Curator" no seu painel — pode mudar quando quiser depois.',
      boasVindasNomePlaceholder: 'Seu nome',
      boasVindasFotoTitulo: 'Deixe seu perfil com a sua cara',
      boasVindasFotoMensagem: 'Adicione uma foto de perfil e uma capa pro seu painel, ou pule e defina depois.',
      boasVindasFotoBotaoAdicionar: 'Adicionar foto de perfil',
      boasVindasFotoBotaoTrocar: 'Trocar foto de perfil',
      boasVindasCapaBotaoAdicionar: 'Adicionar capa',
      boasVindasCapaBotaoTrocar: 'Trocar capa',
      continuar: 'Continuar',
      voltar: 'Voltar',
      reverBoasVindas: 'Rever tela de boas-vindas',
      modoMarcacaoManual: 'Modo marcação manual',
      idiomaIngles: 'Interface em inglês',
      dicaModoManual: 'Com o modo manual ligado: clique numa linha da lista = letra · Shift+clique = instrumental.',
      modoManualSoNaListaTasks: 'O modo marcação manual só funciona na lista de tasks — não na página de missões nem dentro do Studio.',
      categoriaManualLabel: 'Marcadas manualmente',
      cicloLabel: 'Ciclo',
      inicioNovoCiclo: 'Início de novo ciclo',
      // usados no separador de corte de ciclo (pill duplo: ciclo que
      // fechou -> ciclo que abriu) — ver renderPainelLista.
      cicloEncerrado: 'encerrado',
      cicloIniciado: 'iniciado',
      pausarModoManual: 'Pausar modo manual',
      marcandoManualmenteLabel: 'Marcando manualmente',
      nomeExtensao: 'MXM Studio',
      nenhumEnvioRegistradoAinda: 'Nenhum envio registrado ainda.',
      confirmarLimpar: 'Tem certeza que quer apagar todo o log de envios? Essa ação não pode ser desfeita.',
      logApagado: 'Log apagado.',
      debugAtivado: 'Modo debug ativado — logs de captura no console.',
      debugDesativado: 'Modo debug desativado.',
      opcoesDebugSecao: 'Modo debug — simulador de data',
      debugSimuladorDescricao:
        'Simula outra data/hora pra tudo que a extensão calcula a partir de "agora" (ciclo de missões, cronômetro, resumo do dia, virada de mês etc.) — sem mexer no relógio real do dispositivo. O tempo continua correndo normalmente a partir do valor escolhido.',
      debugSimuladorStatusAtivo: 'Simulação ativa',
      debugSimuladorStatusInativo: 'Usando a data/hora real do dispositivo',
      debugSimuladorAplicar: 'Aplicar data simulada',
      debugSimuladorRestaurar: 'Voltar para a data real',
      debugSimuladorPreencherAgora: 'Preencher com agora',
      debugSimuladorAtivadoToast: 'Data simulada aplicada — a extensão agora lê essa data como "agora".',
      debugSimuladorDesativadoToast: 'Simulação desligada — voltando à data/hora real.',
      debugSimuladorSelecioneData: 'Escolha uma data e hora antes de aplicar.',
      debugForcarSemDetalhes: 'Forçar entrada "Sem detalhes" no log (teste)',
      debugForcarTelaIntegracaoPayflow: 'Forçar tela de integração com o Payflow (teste)',
      debugSimuladorListaDescricao:
        'Simula, só na tela, como a lista fica com 0 ou 1 música — sem apagar nem tocar no seu log de verdade. Útil pra testar o estado vazio ou o marcador "Fim da lista"/dicas de lista curta sem precisar zerar o histórico de verdade.',
      debugSimuladorListaOff: 'Lista real (sem simulação)',
      debugSimuladorListaVazia: 'Simular lista vazia',
      debugSimuladorListaUma: 'Simular lista com 1 música',
      debugSimuladorListaAtivadoToast: 'Simulação de lista ativa — o log de verdade continua intacto.',
      debugSimuladorListaDesativadoToast: 'Simulação de lista desligada — voltando à lista real.',
      debugAvisoBannerTexto: 'Se você não sabe o que está fazendo, aconselho sair desse modo.',
      debugAvisoBannerBotaoSair: 'Sair do modo debug',
      avisoEntradaDemonstracaoDebug: 'Essa é uma entrada de demonstração da simulação — não é uma música real do seu log.',
      debugForcarSplashBoasVindas: 'Rever tela de boas-vindas (splash inicial)',
      duracaoLabel: 'Duração',
      missaoLabel: 'Missão',
      tentativasLabel: 'tentativas',
      verLogDeEnvios: 'Ver log de envios (clique direito para opções)',
      trocarIdiomaPara: 'Idioma',
      configuracoes: 'Configurações',
      layoutResumoDia: 'Layout do resumo do dia',
      mostrarResumoDia: 'Mostrar resumo do dia',
      girarResumoAutomaticamente: 'Girar resumo automaticamente',
      layoutLadoLado: 'Lado a lado',
      layoutTipografia: 'Texto',
      layoutChip: 'Chip',
      importarTxt: 'Importar .txt',
      confirmarExclusaoTitulo: 'Confirmar exclusão',
      confirmarExclusaoRegistro: 'Tem certeza que quer remover este registro? Essa ação não pode ser desfeita.',
      // confirmação específica pro menu de contexto da tag "Letra"
      // (apaga só a letra capturada, mantém o resto do registro).
      confirmarExclusaoLetra: 'Tem certeza que quer apagar a letra capturada deste registro? Essa ação não pode ser desfeita.',
      cancelar: 'Cancelar',
      ok: 'OK',
      confirmar: 'Confirmar',
      excluir: 'Excluir',
      // V3.5.58: menu de "mais opções" (3 pontinhos) na linha do log
      // principal, no lugar do antigo ícone único de lixeira.
      maisOpcoes: 'Mais opções',
      abrirNoSite: 'Abrir no site',
      abrirNoStudio: 'Abrir no Studio',
      importadosSucesso: 'registro(s) importado(s)',
      ignoradosLabel: 'ignorado(s)',
      arquivoInvalido: 'Não consegui ler nenhum registro válido nesse arquivo.',
      // backup completo (.json) — dados + configurações.
      backupModalTitulo: 'Restaurar backup completo',
      backupResumoTitulo: 'O que este backup vai alterar',
      backupNovosRegistros: 'música(s) nova(s) no log',
      backupLetrasAlteradas: 'letra(s) diferente(s) da versão salva atualmente',
      backupDiffsSalvosNovos: 'diff(s) salvo(s) novo(s)',
      backupConfigsAlteradas: 'configuração(ões) diferente(s)',
      backupNenhumaMudanca: 'Esse arquivo é idêntico aos dados que você já tem — nada para restaurar.',
      // botão extra no aviso "nada para restaurar" — força aplicar
      // o backup mesmo assim (útil se a comparação não pegar alguma
      // diferença fora do que ela checa, tipo tentativas/imagem/id).
      backupImportarMesmoAssim: 'Importar mesmo assim',
      backupConteudoTitulo: 'Conteúdo deste backup',
      backupResumoMusicas: 'Músicas',
      backupResumoLetras: 'Letras salvas',
      backupVerDiferencas: 'Ver diferenças',
      backupOcultarDiferencas: 'Ocultar',
      backupBotaoRestaurar: 'Restaurar backup',
      backupSucesso: 'Backup restaurado com sucesso. Recarregue a página para aplicar todas as configurações visuais.',
      backupArquivoInvalido: 'Esse arquivo não parece ser um backup completo válido deste script.',
      backupGeradoEm: 'Backup gerado em',
      backupVersaoScript: 'versão',
      backupSemLetraSalva: '(sem letra salva atualmente)',
      backupExportarCurto: 'Exportar backup completo',
      backupImportarCurto: 'Importar backup completo',
      selecionarVarias: 'Selecionar várias',
      redimensionar: 'Arraste para redimensionar',
      selecionarBtn: 'Selecionar',
      sairSelecao: 'Sair da seleção',
      selecionarTodas: 'Selecionar todas',
      desmarcarTodas: 'Desmarcar todas',
      nenhumaSelecionada: 'Nenhum item selecionado',
      itemSelecionado: 'item selecionado',
      itensSelecionados: 'itens selecionados',
      excluirSelecionados: 'Excluir selecionados',
      confirmarExclusaoMultipla: 'Tem certeza que quer remover os itens selecionados? Essa ação não pode ser desfeita.',
      // seção "Perfil de uso" nas Configurações.
      opcoesPerfilUso: 'Perfil de uso',
      perfilCompletoTitulo: 'Completo',
      perfilCompletoDescricao: 'Mostra tudo: log geral, Resumo do dia, painel Detalhado, Reward e Comparar.',
      perfilMinimalistaTitulo: 'Minimalista',
      perfilMinimalistaDescricao:
        'Esconde Resumo do dia, Detalhado, Reward, Comparar e desliga Conquistas — só o log geral dos envios e as ferramentas de letra.',
      avisoModoMinimalista:
        'Você está no modo Minimalista — Resumo do dia, Detalhado, Reward e Comparar ficam ocultos, e Conquistas fica desligado. Mude em "Perfil de uso" abaixo.',
      resumoDiaBloqueadoMinimalista: 'Desligado pelo perfil Minimalista — mude para Completo pra ajustar.',
      opcoesDeVisualizacao: 'Visualização',
      opcoesResumoDia: 'Resumo do dia',
      opcoesAparencia: 'Aparência',
      opcoesGerais: 'Geral',
      buscarConfiguracao: 'Buscar nas configurações...',
      verificarAtualizacoes: 'Verificar atualizações',
      verificando: 'Verificando...',
      versaoAtualizada: 'Você está na versão mais recente',
      novaVersaoDisponivel: 'Nova versão disponível',
      baixarAtualizacao: 'Baixar atualização',
      atualizarAgora: 'Atualizar agora',
      novidadesVersao: 'Novidades desta versão',
      aplicandoAtualizacao: 'Aplicando atualização...',
      atualizacaoAindaNaoPronta: 'O Firefox ainda está preparando essa versão. Tente de novo em alguns instantes.',
      atualizacaoLimitada: 'Aguarde um pouco antes de checar de novo.',
      retryAtualizacaoContagem: 'Tentando de novo em {s}s… ({n}/{max})',
      retryAtualizacaoToqueAgora: 'Toque para tentar agora',
      retryAtualizacaoEsgotado: 'Não deu pra atualizar sozinho depois de várias tentativas. Tente de novo mais tarde ou pela página da AMO.',
      atualizacaoInstalacaoTemporaria: 'Essa instalação é temporária (modo desenvolvedor) — o Firefox não gerencia atualização automática pra ela. Baixe a versão nova pela página da extensão.',
      atualizacaoSemForcarChecagem: 'O Firefox não deixa forçar essa verificação por aqui — mas já está escutando em segundo plano e aplica sozinho assim que o Firefox achar a versão nova (por conta própria ou se você clicar em "Verificar atualizações" no about:addons).',
      abrirPaginaExtensao: 'Abrir página da extensão',
      abrirReleasesGithub: 'Ver Releases no GitHub',
      copiarAboutAddons: 'Copiar "about:addons"',
      aboutAddonsCopiado: 'Copiado! Cole na barra de endereço e aperte Enter.',
      buscandoXpiGithub: 'Buscando .xpi no GitHub...',
      atualizacaoAindaNaoSincronizadaGithub: 'O GitHub ainda não sincronizou essa versão (a sincronização roda periodicamente).',
      erroConsultarGithub: 'Não deu pra consultar o GitHub agora.',
      erroVerificarAtualizacao: 'Não foi possível verificar agora. Tente de novo mais tarde.',
      versaoInstalada: 'Versão instalada',
      versaoTabsV3: 'Versão do Tabs V3',
      notificarAtualizacaoAuto: 'Avisar sobre atualizações automaticamente',
      opcoesNotificacoes: 'Notificações',
      notifDicasAtivar: 'Dicas de uso no sino de notificações',
      notifDicasAtivarDesc: 'Mostra dicas de uso de vez em quando no sino de notificações.',
      extensaoAtualizada: 'Extensão atualizada',
      verNotasVersao: 'Ver página da extensão',
      // interruptor de "esperar a janela de confirmação antes de
      // registrar o envio" — ligado por padrão (ver
      // STORAGE_CONFIRMAR_ENVIO_KEY).
      confirmarEnvioAtivar: 'Confirmar envio antes de registrar',
      confirmarEnvioDesc:
        'Espera a janela verde de sucesso aparecer antes de registrar no log (mais seguro, mas pode demorar um pouco). Desligue pra registrar assim que clicar em "Enviar", como era antes.',
      // interruptor do sistema de conquistas — desligado por
      // padrão (ver STORAGE_CONQUISTAS_ATIVAS_KEY).
      sistemaConquistas: 'Sistema de conquistas',
      sistemaConquistasDesc: 'Badges por marcos como quantidade de músicas, dias seguidos e diffs salvos.',
      // botão "Ferramentas úteis" (grade expansível no painel
      // principal, abaixo do resumo Hoje/Recorde) — agrupa os atalhos que
      // antes viviam soltos no cabeçalho.
      ferramentasUteis: 'Ferramentas úteis',
      // no Diff Check, mostra as tags de estrutura (#Verse,
      // #Chorus etc.) como uma barra única fixa, em vez de participarem do
      // diff coluna a coluna normal.
      diffFixarTagsBeta: 'Fixar tags no mesmo lugar',
      betaTag: 'BETA',
      // aba "Reward"
      reward: 'Reward',
      verReward: 'Reward',
      logReward: 'Log de Reward',
      totalGanho: 'Total ganho',
      historicoDias: 'últimos {dias} dias',
      cotacaoAtual: 'Cotação atual',
      buscandoCotacao: 'Buscando cotação...',
      cotacaoIndisponivel: 'Cotação indisponível — usando valor de referência',
      rewardPorMissao: 'Reward por missão',
      taxaEstimada: 'taxa estimada',
      tarefasAbrev: 'tarefas',
      semReward: 'Nenhum envio com missão identificada ainda.',
      fonteWidget: 'Dados ao vivo via Payflow',
      fonteWidgetCurta: 'Ao vivo',
      fonteLog: 'Estimado a partir deste log — instale a extensão Payflow pra dados exatos',
      fonteLogCurta: 'Estimado',
      poweredByPayflow: 'Powered by Payflow',
      descontoManual: 'Desconto de $ {amount} aplicado manualmente no widget',
      avisoExtensaoRewardAusente:
        'A extensão Payflow não está instalada, está desativada, ou ainda não registrou nenhuma missão — os valores abaixo são só uma estimativa baseada neste log. Instale/ative a extensão pra ver os valores reais.',
      baixarExtensaoTotalUsdBrl: 'Baixar extensão Payflow no Firefox Add-ons',
      // pergunta mostrada quando o mês vira, oferecendo guardar o
      // resumo (quantidade de músicas + valor ganho) do mês que terminou.
      resumoMensalTitulo: 'Guardar resumo do mês',
      resumoMensalMensagem:
        'O mês de {mes} terminou. Quer guardar o resumo dele — {qtd} música(s) enviada(s) e {usd} ({brl}) em reward — para comparar com outros meses depois?',
      resumoMensalBotaoSalvar: 'Salvar resumo',
      resumoMensalAgoraNao: 'Agora não',
      resumoMensalSalvoToast: 'Resumo de {mes} guardado.',
      // banner (não mais popup) mostrado acima da barra de busca a
      // partir das 21h de Brasília do último dia do mês, até o usuário
      // clicar em "Mudar o ciclo".
      avisoTrocaCicloTitulo: 'O ciclo de missões já virou?',
      avisoTrocaCicloMensagem:
        'O ciclo de missões deste mês já deve ter virado (21h, horário de Brasília) mesmo que o calendário ainda mostre hoje. Confirme quando notar a mudança na Musixmatch.',
      avisoTrocaCicloBotaoConfirmar: 'Mudar o ciclo',
      avisoTrocaCicloConfirmadoToast: 'Ok, ciclo alterado — resumo disponível se quiser guardar.',
      avisoDiffManualMinimizadoMensagem: 'Você tem um Diff manual minimizado, com a comparação esperando de onde parou.',
      avisoDiffManualMinimizadoBotaoVoltar: 'Voltar para o Diff manual',
      // lista de resumos mensais guardados, exibida na aba Reward.
      resumosMensaisTitulo: 'Resumos mensais guardados',
      resumosMensaisVazio: 'Nenhum resumo guardado ainda — quando um mês virar, você vai poder guardar o resumo dele aqui.',
      resumosMensaisApagar: 'Apagar este resumo',
      resumosMensaisRever: 'Rever este resumo',
      resumosMensaisConfirmarApagar: 'Apagar o resumo guardado desse mês? Essa ação não pode ser desfeita.',
      resumosMensaisVerAgora: 'Ver resumo agora',
      resumosMensaisIndisponivel: 'Resumo indisponível',
      resumoAtualTitulo: 'Resumo deste mês (até agora)',
      resumoAtualVerSlides: 'Ver em slides',
      resumoSlidesVerCompleto: 'Ver resumo completo',
      resumoAtualBotaoSalvar: 'Salvar este resumo agora',
      // V3.5.58: quando já existe um "corte" salvo deste mês, o botão
      // deixa isso explícito em vez de repetir o texto de "primeiro
      // salvamento" — o resumo do mês em andamento é sempre recalculado
      // ao vivo (ver abrirResumoAtual), então salvar de novo é uma
      // atualização do corte, não uma ação nova.
      resumoAtualBotaoAtualizar: 'Atualizar resumo salvo',
      resumoAtualFechar: 'Fechar',
      resumoAtualConfirmarSobrescrever:
        'Você já tem um resumo salvo pra este mês — salvar de novo vai substituí-lo pelos números atuais. Continuar?',
      // linhas extras do cartão "Ver resumo agora" — maior/menor
      // música (por duração), maior/menor letra capturada (por tamanho do
      // texto), instrumentais e missão com mais/menos envios no mês.
      resumoAtualDetalhesTitulo: 'Mais detalhes do mês',
      resumoAtualMusicaMaisLonga: 'Música mais longa',
      resumoAtualMusicaMaisCurta: 'Música mais curta',
      resumoAtualLetraMaisLonga: 'Letra mais longa',
      resumoAtualLetraMaisCurta: 'Letra mais curta',
      resumoAtualInstrumentais: 'Instrumentais no mês',
      resumoAtualMissaoMais: 'Missão com mais envios',
      resumoAtualMissaoMenos: 'Missão com menos envios',
      resumoAtualCaractere: '1 caractere',
      resumoAtualCaracteres: '{n} caracteres',
      // carrossel de slides (uma tela cheia por métrica) aberto
      // pelo botão "Ver em slides" no cartão de resumo — pensado pra ser
      // mostrado/compartilhado no fim do mês, tipo um "retrospectiva".
      resumoAtualVerSlides: 'Ver em slides',
      resumoSlidesBRL: 'Total em Reais',
      resumoSlidesMoedaGenerica: 'Total em {moeda}',
      resumoSlidesUSD: 'Total em Dólares',
      resumoSlidesTarefas: 'Tarefas enviadas',
      // PoC preview Apple Music (ver montarBotaoPreviewAppleMusic).
      resumoPreviewCarregando: 'Buscando prévia…',
      resumoPreviewOuvir: 'Ouvir prévia',
      resumoPreviewTocando: 'Tocando…',
      logCapaOuvirPreviaTooltip: 'Ouvir prévia de 30s',
      logCapaPreviaIndisponivel: 'Prévia não encontrada pra essa faixa.',
      resumoSlidesCapaTitulo: 'Seu resumo de {mes}',
      resumoSlidesFinalTitulo: 'Isso foi {mes}!',
      resumoSlidesFinalTexto: 'Bora fechar mais um mês assim.',
      resumoSlidesAnterior: 'Anterior',
      resumoSlidesProximo: 'Próximo',
      resumoSlidesComecar: 'Começar',
      // título do botão de mutar/desmutar a musiquinha de fundo
      // do carrossel de slides do resumo mensal (ver abrirResumoSlides).
      resumoMusicaSilenciar: 'Silenciar música',
      resumoMusicaAtivar: 'Ativar música',
      // seção "Backup" das Configurações — backup automático em
      // disco, pra proteger os dados de uma desinstalação da extensão.
      opcoesBackup: 'Backup',
      // V3.5.53: a seção inteira saiu daqui e virou o painel dedicado
      // (ver backupMudouAcao/abrirPainelBackup) — sobrou só este aviso +
      // atalho, em vez de duplicar as mesmas opções em dois lugares.
      backupMudouDescricao: 'Os backups mudaram de lugar, agora organize todos os backups em um só lugar!',
      backupMudouAcao: 'Abrir Backup e Restauração',
      // V3.5.52: painel "Backup e Restauração" próprio, na grade
      // "Ferramentas úteis" — reúne tudo que antes ficava espalhado
      // (Configurações → Backup, menu do FAB) num único lugar, com
      // visual de "área segura" pros dados do usuário.
      backupRestauracaoTitulo: 'Backup e Restauração',
      backupAreaSeguraTitulo: 'Seus dados, protegidos',
      backupAreaSeguraDescricao:
        'Nada sai daqui sem você pedir. Backup em disco fica só no seu computador; backup na nuvem só é enviado quando você ativa ou clica em enviar.',
      backupResumoMusicasProtegidas: 'música(s) no log',
      backupResumoDiffsProtegidos: 'diff(s) salvo(s)',
      backupResumoResumosProtegidos: 'resumo(s) mensal(is)',
      backupSecaoArquivoCompleto: 'Backup completo (arquivo)',
      backupSecaoArquivoCompletoDescricao:
        'Gera um arquivo .json com todo o seu log, diffs salvos, resumos mensais e configurações — pra guardar você mesmo ou levar pra outro computador.',
      backupSecaoDisco: 'Backup automático em disco',
      backupSecaoNuvem: 'Backup na nuvem (Google)',
      backupSecaoTextoSimples: 'Log em texto simples (.txt)',
      backupSecaoTextoSimplesDescricao:
        'Formato mais simples, só com o log de envios em texto — sem diffs, resumos ou configurações. Útil pra ler rápido ou colar em outro lugar.',
      backupZonaRiscoTitulo: 'Zona de risco',
      backupAutomaticoAtivar: 'Backup automático em disco',
      backupAutomaticoDescricao:
        'Salva uma cópia dos seus dados de tempos em tempos na pasta Downloads/MXMBackups, pra não perder tudo se desinstalar a extensão.',
      backupAutomaticoFazerAgora: 'Fazer backup agora',
      // mesmo fluxo de "Importar backup completo" (que antes só
      // existia no menu de contexto do ícone da extensão), agora também
      // acessível direto por aqui, na seção Backup do painel.
      backupAutomaticoRestaurar: 'Restaurar backup completo',
      backupAutomaticoSucesso: 'Backup salvo em Downloads/MXMBackups.',
      backupAutomaticoErro: 'Não consegui salvar o backup automático — verifique as permissões de download da extensão.',
      // backup na nuvem (Firebase) — complementa o backup automático
      // em disco, permitindo restaurar em outro computador/navegador.
      nuvemDescricao: 'Envia um backup pra nuvem, vinculado à sua conta Google, pra restaurar em outro computador.',
      nuvemEnviar: 'Enviar backup pra nuvem',
      nuvemRestaurar: 'Restaurar da nuvem',
      // envio automático (silencioso) do backup pra nuvem — pensado pra
      // quem alterna entre PC e notebook e esquece de sincronizar na mão.
      backupNuvemAutomaticoAtivar: 'Backup automático na nuvem',
      backupNuvemAutomaticoDescricao:
        'Envia o backup pra nuvem sozinho de tempos em tempos, sem precisar clicar em "Enviar backup pra nuvem". Requer já ter feito login com o Google pelo menos uma vez.',
      // mostrado logo abaixo do interruptor de backup automático na
      // nuvem, com a data/hora do último envio bem-sucedido (manual ou
      // automático) — ver STORAGE_ULTIMO_BACKUP_NUVEM_KEY.
      nuvemUltimoBackup: 'Último backup na nuvem: {data}',
      nuvemUltimoBackupNunca: 'Você ainda não fez nenhum backup na nuvem.',
      // seletor de frequência do envio automático pra nuvem — aparece
      // só quando o interruptor acima está ligado (ver renderCorpoNuvem,
      // dentro do painel "Backup e Restauração").
      nuvemFrequenciaTitulo: 'Frequência do backup automático',
      nuvemFrequenciaDiaria: 'Diária',
      nuvemFrequenciaSemanal: 'Semanal',
      nuvemFrequenciaMensal: 'Mensal',
      nuvemEnvioSucesso: 'Backup enviado pra nuvem.',
      // mostrado quando o backup precisou de mais de 1 parte
      // (sharding) — ver coletarBackupParaNuvem/dividirEmPartesUtf8Seguro.
      nuvemEnvioSucessoPartes: 'Backup enviado pra nuvem em {n} partes.',
      nuvemEnvioErro: 'Não consegui enviar o backup pra nuvem — verifique sua conexão e tente de novo.',
      nuvemNenhumBackup: 'Nenhum backup encontrado na nuvem ainda.',
      nuvemRestaurarErro: 'Não consegui buscar o backup na nuvem — verifique sua conexão e tente de novo.',
      // backup no Google Drive — terceiro destino de backup, separado do
      // Firestore (ver docs/backup-google-drive.md). Salvo numa pasta
      // própria "Echoform Backups" no Drive do usuário.
      backupSecaoDrive: 'Backup no Google Drive',
      backupSecaoDriveDescricao:
        'Envia um backup pra sua conta do Google Drive, numa pasta própria da extensão, pra restaurar em outro computador.',
      driveEnviar: 'Enviar backup pro Drive',
      driveRestaurar: 'Restaurar do Drive',
      driveRequerGoogle: 'Requer login com sua conta Google',
      backupDriveAutomaticoAtivar: 'Backup automático no Drive',
      backupDriveAutomaticoDescricao:
        'Envia o backup pro Drive sozinho de tempos em tempos, sem precisar clicar em "Enviar backup pro Drive". Requer já ter feito login com o Google pelo menos uma vez.',
      // menu de missão (clique direito numa música do log)
      definirMissao: 'Definir missão',
      outraMissao: 'Outra missão...',
      menuInstrumentalMarcar: 'Marcar como instrumental',
      menuInstrumentalDesmarcar: 'Desmarcar instrumental',
      digitarNomeMissao: 'Digite o nome da missão:',
      // nome do curator (editável) e sistema de comparação de logs
      curator: 'Curator',
      editarNomeCurator: 'Clique pra usar seu próprio nome',
      mashupMagico: 'Mashup Mágico',
      mashupMagicoAtivar: 'Sortear Mashup Mágico',
      mashupMagicoIndisponivel: 'Envie mais músicas com letra salva pra desbloquear o Mashup Mágico',
      digitarNomeCurator: 'Digite seu nome (deixe em branco pra voltar a "Curator"):',
      // foto de perfil customizada no painel de log detalhado
      editarFotoCurator: 'Clique pra trocar a foto',
      alterarFoto: 'Alterar foto',
      usarFotoPadrao: 'Usar foto padrão do MXM',
      cliqueDireito: 'clique direito',
      fotoInvalida: 'Não deu pra usar essa imagem — tente outro arquivo.',
      // capa/banner customizada + editor de recorte (foto e capa,
      // ambos aceitam GIF animado)
      editarCapaCurator: 'Clique pra trocar a capa · clique direito: mais opções',
      alterarCapa: 'Alterar capa',
      removerCapa: 'Remover capa',
      recorteArrasteAviso: 'Arraste a imagem pra posicionar e use o zoom pra ajustar o recorte.',
      recorteSalvar: 'Salvar recorte',
      ajustarRecorte: 'Ajustar recorte',
      imagemGrandeDemais: 'Essa imagem é grande demais — escolha um arquivo de até 8MB.',
      comparar: 'Comparar',
      logComparacao: 'Comparar Log',
      exportarComparacao: 'Exportar meu log',
      importarComparacao: 'Importar arquivo de outra pessoa',
      comparacaoSemImportacao:
        'Exporte o seu log e peça pra outra pessoa fazer o mesmo — depois importe o arquivo .json dela aqui pra ver a comparação lado a lado.',
      arquivoComparacaoInvalido: 'Esse arquivo não é um log de comparação válido.',
      vc: 'Você',
      totalDeEnvios: 'Total de envios',
      duracaoMedia: 'Duração média',
      diasAtivos: 'Dias ativos',
      naoDisponivelAbrev: 'N/D',
      comparadoEm: 'Comparando com',
      trocarArquivoComparacao: 'Trocar arquivo',
      // reorganização do menu de configurações em seções
      opcoesComportamento: 'Comportamento',
      opcoesAtualizacoes: 'Atualizações',
      opcoesExperimental: 'Experimental',
      // nova seção "Ajuda" nas configurações, com a opção de rever
      // o tutorial inicial manualmente (antes só existia pelo menu do
      // Tampermonkey, escondido pra quem não sabia que existia).
      opcoesAjuda: 'Ajuda',
      reverTutorial: 'Rever tutorial inicial',
      // splash de primeira montagem — tela vazia (só logo + frase) mostrada
      // por um instante antes do painel real "se montar" por cima dela, na
      // primeiríssima vez que o usuário abre a extensão (ver
      // mostrarSplashPrimeiraMontagem).
      splashBoasVindasFrase: 'Bem-vindo(a) ao Echoform',
      splashBoasVindasLegenda: 'Vamos te mostrar rapidinho como tudo funciona por aqui.',
      splashBoasVindasAprender: 'Aprender',
      // tour inicial (balões de tutorial, mostrados só uma vez)
      tourMissao: 'Clique com o botão direito numa música da lista pra escolher (ou corrigir) em que missão ela foi feita.',
      // V3.5.52: apresenta a grade "Ferramentas úteis" como um todo antes
      // dos passos seguintes entrarem no detalhe de Detalhado/Reward —
      // ela cresceu bastante (Diff manual, Diffs salvos, trocar idioma,
      // Comparar, Ciclos, Bloco de notas, Backup e Restauração) e nenhum
      // passo do tour apresentava o conjunto até agora.
      tourFerramentas:
        'Aqui ficam as ferramentas extras: Diff manual e Diffs salvos (comparar letras), trocar idioma, Comparar com outro curator, Ciclos, Bloco de notas e Backup e Restauração — além de Detalhado e Reward, que têm um passo só pra elas a seguir.',
      tourDetalhado: 'Clique aqui para logs detalhados: músicas por missão, faixa mais curta/mais longa e horários de pico.',
      tourReward: 'Clique aqui para detalhes de pagamentos: total ganho e reward estimado por missão.',
      // dica final do tour, mostrando onde ficam as configurações.
      tourConfiguracoes: 'É aqui que ficam as configurações do script — aparência, comportamento e mais. Pode rever este tutorial a qualquer momento por aqui.',
      tourRedimensionar: 'Essa janela é redimensionável — arraste este canto pra deixá-la maior ou menor.',
      tourProximo: 'Próximo',
      tourEntendi: 'Entendi',
      tourPular: 'Pular',
      diffCheck: 'Diff Check',
      diffCheckDesc: 'Comparar com a última versão salva',
      diffCheckTitulo: 'Diff Check — comparação de letra',
      // aviso mostrado antes de abrir o Diff Check, sugerindo
      // recarregar a página primeiro pra letra carregar "limpa" (ver
      // abrirAvisoRecarregarDiffCheck).
      diffAvisoRecarregarTitulo: 'Antes de abrir o Diff Check',
      diffAvisoRecarregarMensagem:
        'Pra letra carregar de um jeito mais limpo (evitando comparações quebradas), recarregue a página antes de usar o Diff Check.',
      diffAvisoRecarregarBotao: 'Recarregar página',
      diffAvisoRecarregarContinuar: 'Continuar assim mesmo',
      // rótulo do interruptor nas Configurações que liga/desliga
      // o aviso acima.
      diffAvisoRecarregarAtivarLabel: 'Aviso pra recarregar antes do Diff Check',
      // tooltip mostrado quando o interruptor acima fica desativado por
      // causa do modo de captura "Rede" (ver criarItemSwitch/getDisabled
      // em criarItemModoCapturaDiff).
      diffAvisoRecarregarDesativadoModoRede: 'Não se aplica no modo de captura "Rede" — a letra já vem certa direto da rede, sem precisar recarregar.',
      diffIndoParaSincronizacao: 'Abrindo a aba Sincronização (mais confiável pra ler a letra completa)...',
      diffIndoParaTraducao: 'Abrindo a aba Tradução...',
      diffSemFaixa: 'Não consegui identificar a música desta página.',
      diffSemVersaoSalva: 'Ainda não há uma versão salva dessa letra pra comparar. Envie essa música pelo menos uma vez.',
      diffSemCapturaAtual: 'Não consegui capturar a letra desta tela agora. Role até a letra aparecer na tela e tente de novo.',
      // mostrado na área de conteúdo do painel assim que ele abre,
      // enquanto a captura da letra (via Tradução/Fiber/auto-scroll) ainda
      // está rodando — evita o painel parecer travado só com o cabeçalho.
      diffCarregandoLetra: 'Carregando a letra desta tela...',
      diffAdicionadas: 'adicionada(s)',
      diffRemovidas: 'removida(s)',
      diffVersaoAnterior: 'Versão anterior (salva)',
      diffVersaoAtual: 'Versão atual (nesta tela)',
      diffCopiar: 'Copiar diff',
      diffCopiarEstaLetra: 'Copiar esta letra',
      diffCopiado: 'Diff copiado!',
      // contador de linhas por coluna no cabeçalho do diff (ex: "143
      // linhas"), igual ao que o site original do Musixmatch mostra.
      diffLinhas: 'linha(s)',
      diffVerComoDigitada: 'Ver como digitada',
      diffVerComparacao: 'Ver comparação',
      diffAlinharLinhasAtivar: 'Alinhar linhas (modo antigo)',
      diffAlinharLinhasDesativar: 'Colunas independentes (padrão)',
      diffAlinharLinhasLabel: 'Alinhar linhas',
      diffEspacoDiferenca: 'Espaço em branco — parte da diferença',
      diffEspacoUnidade: 'espaço',
      diffEspacoUnidadePlural: 'espaços',
      diffSalvar: 'Salvar',
      diffSalvo: 'Diff salvo!',
      diffExportarHtml: 'Exportar HTML',
      diffExportado: 'Diff exportado!',
      diffCompartilharLink: 'Compartilhar link',
      diffLinkCopiado: 'Link copiado! Cole pra compartilhar.',
      diffLinkCopiadoNuvem: 'Link curto copiado! Expira sozinho em 30 dias.',
      diffLinkCopiadoCurto: 'Link curto copiado! Cole pra compartilhar.',
      diffLinkCopiadoGrande: 'Link copiado! (é longo — se algum app cortar, envie por outro meio)',
      diffLinkErro: 'Não foi possível gerar o link. Tente de novo.',
      diffSalvarNomePrompt: 'Nome para esse diff:',
      diffTornarBase: 'Tornar base',
      diffTornarBaseTooltip:
        'Salva a versão atual (nesta tela) como a nova versão base no log, substituindo a versão anterior salva',
      diffTornarBaseConfirmarTitulo: 'Tornar versão atual em base?',
      diffTornarBaseConfirmarMensagem:
        'A versão atual (mostrada nesta tela) vai substituir a versão anterior salva no log. Essa ação não pode ser desfeita.',
      diffTornarBaseConfirmarBotao: 'Tornar base',
      diffTornarBaseSucesso: 'Versão atual salva como base',
      fechar: 'Fechar',
      minimizar: 'Minimizar',
      diffManualRestaurarPainel: 'Voltar para o Diff manual',
      diffManualMinimizadoAviso: 'Há um Diff manual minimizado — clique para voltar',
      // botão "sortear outra frase" da brincadeirinha da tag
      // Instrumental (ver abrirBrincadeiraInstrumental).
      brincadeiraInstrumentalOutra: 'Outra',
      // painel "Diffs salvos" — lista das comparações guardadas
      // pelo botão "Salvar" acima.
      diffsSalvosTitulo: 'Diffs salvos',
      diffsSalvosVazio: 'Nenhum diff salvo ainda. Use o botão "Salvar" dentro de um Diff Check ou Diff manual pra guardar uma comparação aqui.',
      diffsSalvosExcluirConfirmar: 'Excluir esse diff salvo? Essa ação não pode ser desfeita.',
      diffsSalvosAbrirTooltip: 'Abrir',
      diffsSalvosExcluirTooltip: 'Excluir',
      diffsSalvosVoltar: 'Voltar pra lista',
      // painel "Bloco de notas" — anotações livres do usuário, com
      // vínculo opcional a uma música e/ou a um ciclo (ver
      // abrirBlocoDeNotas).
      blocoDeNotasTitulo: 'Bloco de notas',
      blocoDeNotasVazio: 'Nenhuma anotação ainda. Toque em "Nova nota" pra escrever a primeira.',
      blocoDeNotasNovaNota: 'Nova nota',
      blocoDeNotasEditarTooltip: 'Editar',
      blocoDeNotasExcluirTooltip: 'Excluir',
      blocoDeNotasExcluirConfirmar: 'Excluir essa nota? Essa ação não pode ser desfeita.',
      blocoDeNotasPlaceholderTexto: 'Escreva sua anotação aqui...',
      blocoDeNotasMusicaLabel: 'Música (opcional)',
      blocoDeNotasMusicaPlaceholder: 'Buscar música pelo título...',
      blocoDeNotasMusicaLimpar: 'Remover vínculo com música',
      blocoDeNotasCicloLabel: 'Ciclo (opcional)',
      blocoDeNotasCicloNenhum: 'Nenhum ciclo',
      blocoDeNotasSalvar: 'Salvar nota',
      blocoDeNotasCancelar: 'Cancelar',
      blocoDeNotasVoltar: 'Voltar pra lista',
      blocoDeNotasSemTexto: 'Escreva algo antes de salvar a nota.',
      // painel "Ciclos" — lista os ciclos de missão do ano atual, com
      // nome (renomeável), datas, nº de músicas e valores USD/BRL de
      // cada um (ver abrirPainelCiclos/renderPainelCiclos).
      ciclosTitulo: 'Ciclos',
      cicloNumeroPadraoPrefixo: 'Ciclo',
      cicloAtualBadge: 'Atual',
      cicloRenomearTooltip: 'Renomear ciclo',
      cicloVerNoLogTooltip: 'Ver no log — vai até a primeira música deste ciclo',
      cicloRenomearPrompt: 'Nome do ciclo',
      cicloMusicaSingular: 'música',
      cicloMusicaPlural: 'músicas',
      diffAvisoTelaRecomendada:
        'O Diff Check funciona melhor nas telas de Transcrever e Sincronização — nesta tela a captura da letra pode vir incompleta ou incorreta.',
      // preferência "Modo de captura" nas Configurações — escolhe se
      // o Diff Check troca de aba automaticamente antes de capturar ou
      // captura direto na tela atual (ver getModoCapturaDiffCheck).
      diffModoCapturaLabel: 'Modo de captura do Diff Check',
      diffModoCapturaDesc:
        'Escolhe como o Diff Check pega a letra pra comparar. Deixe em "Rede" (recomendado) — os outros modos são só pra casos específicos.',
      diffModoCapturaRede: 'Rede (recomendado)',
      diffModoCapturaAuto: 'Automático',
      diffModoCapturaAtual: 'Tela atual',
      diffModoCapturaSincronizacao: 'Sincronização',
      diffModoCapturaTraducao: 'Tradução',
      diffModoCapturaAvisoTrocaManual:
        'Rede é o único modo confiável para tags de estrutura. Trocar pra outro modo é considerado uso indevido do Diff Check — as tags podem sair incompletas ou erradas.',
      diffModoCapturaAvisoTituloPopup: 'Tem certeza que quer trocar de modo?',
      diffPriorizarSincronizacaoLabel: 'Priorizar Sincronização na troca automática',
      diffPriorizarSincronizacaoDesc:
        'Quando os modos Rede/Automático ainda precisam trocar de aba pra buscar tags, decide se essa troca vai pra Sincronização (padrão — mais confiável pra tags e instrumentais) ou pra Tradução (caminho mais novo, mas sem tags de instrumental e menos confiável pras demais tags).',
      diffAvisoTagsIgnoradas:
        'As tags de estrutura (#Verse, #Chorus etc.) não aparecem nesta tela e foram ignoradas nesta comparação.',
      // a aba de Tradução (pra onde o Diff Check sempre leva) não
      // tem nenhuma forma de mostrar um trecho instrumental — ver
      // possuiTagInstrumental/removerLinhasDeTagInstrumental.
      diffAvisoInstrumentalIgnorado:
        'Esta tela não tem como mostrar trechos instrumentais — a tag "Instrumental" foi ignorada nesta comparação.',
      opcoesBotaoBarra: 'Opções',
      copiarLetra: 'Copiar letra',
      copiarLetraDesc: 'Copiar a letra atual da tela',
      letraCopiada: 'Letra copiada!',
      // botão "Editar" no visualizador de letra (ao lado de
      // "Copiar letra") — deixa corrigir o texto salvo direto ali, sem
      // precisar reenviar a música.
      editarLetra: 'Editar',
      salvarLetra: 'Salvar',
      letraAtualizada: 'Letra atualizada!',
      editarLetraPlaceholder: 'Edite a letra aqui...',
      // botão de ordenar/filtrar ao lado da primeira data no log
      // principal.
      ordenarFiltrarTitulo: 'Ordenar / filtrar',
      adicionarEntradaVaziaTitulo: 'Adicionar música vazia pra preencher na mão',
      adicionarEntradaVaziaBotao: 'Adicionar música vazia',
      entradaVaziaAdicionadaToast: 'Música vazia adicionada. Clique nela no log pra completar título e artista.',
      ordenarPorData: 'Data (mais recente)',
      ordenarPorMissao: 'Missão',
      ordenarAlfabetica: 'Ordem alfabética',
      semMissaoLabel: 'Sem missão',
      diffManual: 'Diff manual',
      diffManualDesc: 'Comparar duas letras coladas manualmente',
      diffManualTitulo: 'Diff manual — comparar duas letras',
      diffManualLetra1: 'Letra 1',
      diffManualLetra2: 'Letra 2',
      diffManualPlaceholder1: 'Cole aqui a primeira letra...',
      diffManualPlaceholder2: 'Cole aqui a segunda letra...',
      diffManualComparar: 'Comparar',
      diffManualNovaComparacao: 'Nova comparação',
      diffManualPreencherAmbas: 'Cole as duas letras nos campos acima para comparar.',
      diffManualSemDiferencas: 'As duas letras coladas são iguais — nenhuma diferença encontrada.',
      diffManualVersao1: 'Letra 1',
      diffManualVersao2: 'Letra 2',
      conquistasTitulo: 'Conquistas',
      conquistasProgresso: 'desbloqueadas',
      conquistaDesbloqueadaToast: 'Conquista desbloqueada',
      conquistaDesbloqueadaEm: 'Desbloqueada em',
      conquistaBloqueada: 'Ainda não desbloqueada',
      conquistaVerTodas: 'Ver todas',
      conquistaMusicasTitulo: '{n} música(s) no log',
      conquistaMusicasDesc: 'Registre {n} música(s) no seu log de envios.',
      conquistaRecordeTitulo: 'Recorde de {n} num só dia',
      conquistaRecordeDesc: 'Registre {n} música(s) em um único dia.',
      conquistaSequenciaTitulo: '{n} dia(s) seguidos enviando',
      conquistaSequenciaDesc: 'Registre pelo menos 1 música em {n} dia(s) seguidos.',
      conquistaDiffsTitulo: '{n} diff(s) salvo(s)',
      conquistaDiffsDesc: 'Salve {n} comparação(ões) de diff pra consultar depois.',
      conquistaPerfilTitulo: 'Perfil com a sua cara',
      conquistaPerfilDesc: 'Defina um nome e uma foto customizados no seu perfil.',
      conquistaNuvemTitulo: 'Backup na nuvem',
      conquistaNuvemDesc: 'Envie um backup completo pra nuvem pela primeira vez.',
    }
  };
})();
