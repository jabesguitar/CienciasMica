export type Question = {
  id: number;
  topic: string;
  question: string;
  options: string[];
  answer: number;
  hint: string;
  explanation: string;
  page: string;
};

export type StudySection = {
  id: string;
  icon: string;
  title: string;
  intro: string;
  bullets: string[];
  remember: string;
  image?: string;
  imageAlt?: string;
  imageCredit?: string;
  imageSource?: string;
  page: string;
};

export const studySections: StudySection[] = [
  {
    id: 'naturais', icon: '🌿', title: 'Materiais naturais e recursos naturais',
    intro: 'Materiais naturais são encontrados na natureza e podem ser usados como matéria-prima para fabricar produtos.',
    bullets: [
      '<strong>Origem vegetal:</strong> algodão e madeira.',
      '<strong>Origem animal:</strong> couro, lã e seda.',
      '<strong>Origem mineral:</strong> areia, minérios, carvão mineral e petróleo bruto.',
      'A areia é formada por partículas minerais, como quartzo, e é usada na construção civil e na fabricação de vidro.',
      'A hematita é um minério de ferro; a bauxita é um minério de alumínio. A borracha natural é obtida do látex da seringueira.',
      'Carvão mineral e petróleo bruto também são fontes de energia. Como contêm carbono, sua queima libera gás carbônico (CO₂).',
      '<strong>Recursos renováveis:</strong> podem ser regenerados pela natureza em períodos relativamente curtos, como muitos recursos de origem vegetal e animal.',
      '<strong>Recursos não renováveis:</strong> levam milhões de anos para se formar e não são rapidamente repostos. Exemplos citados no livro: petróleo, carvão e minerais.'
    ],
    remember: 'Renovável não significa infinito: o uso precisa ser consciente para evitar esgotamento e danos ambientais.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Cotton_plants.jpg/960px-Cotton_plants.jpg',
    imageAlt: 'Fibras de algodão natural', imageCredit: 'Mokkie · CC BY-SA 4.0', imageSource: 'https://commons.wikimedia.org/wiki/File:Cotton_plants.jpg', page: '43–45'
  },
  {
    id: 'manufaturados', icon: '🧵', title: 'Materiais manufaturados de origem natural',
    intro: 'São materiais de origem natural que passam por transformações físicas antes de serem utilizados.',
    bullets: [
      'O algodão é fiado e transformado em fios e tecidos.',
      'Os metais precisam ser extraídos de seus minérios.',
      'A madeira pode ser cortada e lixada para fabricar móveis.',
      'Manufaturado é o produto fabricado ou transformado por processos industriais ou artesanais.'
    ],
    remember: 'Transformação física não é o mesmo que produzir um material sintético: a matéria-prima natural continua sendo a base do produto.',
    page: '45'
  },
  {
    id: 'sinteticos', icon: '🧪', title: 'Materiais sintéticos ou artificiais',
    intro: '“Sintetizar”, na Química, é formar substâncias novas pela combinação de outras substâncias. Materiais sintéticos são produzidos em laboratórios e indústrias por transformações químicas e físicas.',
    bullets: [
      'Não são encontrados diretamente na natureza na forma em que são fabricados.',
      'São criados para apresentar propriedades específicas, como durabilidade, leveza ou resistência.',
      'Exemplos: PET, náilon, poliéster, elastano, borracha sintética, couro sintético, tintas, sabões, detergentes e xampus.',
      'O livro informa que o couro sintético surgiu em 1825 e é usado em revestimentos de automóveis e acessórios.',
      '<strong>Transformação química:</strong> ocorre quando uma reação forma novas substâncias. A síntese de polímeros e a produção de materiais sintéticos são exemplos estudados no capítulo.',
      'A etiqueta da roupa ajuda a identificar a composição: algodão, lã, seda e linho são fibras naturais; poliéster, náilon e elastano são sintéticos.'
    ],
    remember: 'O livro cita a borracha sintética criada por Fritz Hofmann em 1909, o couro sintético de 1825 e a penicilina descoberta em 1928 como exemplo importante de medicamento sintético.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Materials_recovery_facility.jpg/1280px-Materials_recovery_facility.jpg',
    imageAlt: 'Materiais plásticos separados para triagem', imageCredit: 'Michal Maňas · CC BY 3.0', imageSource: 'https://commons.wikimedia.org/wiki/File:Materials_recovery_facility.jpg', page: '45–47'
  },
  {
    id: 'impactos', icon: '🌎', title: 'Materiais e impactos socioambientais',
    intro: 'A extração de recursos naturais, a fabricação e o descarte dos materiais podem trazer benefícios, mas também gerar problemas ambientais e sociais.',
    bullets: [
      'A exploração de recursos também pode gerar empregos, movimentar a economia local e royalties para cidades produtoras.',
      'A extração e o processamento do petróleo podem poluir o solo, a água e o ar e afetar comunidades próximas.',
      'O corte excessivo de florestas nativas ameaça espécies e pode causar danos irreversíveis. Madeira de reflorestamento é apresentada como alternativa.',
      'A mineração artesanal de ouro pode usar mercúrio; seus vapores e resíduos metálicos contaminam água, peixes e comunidades ribeirinhas.',
      'Tecidos sintéticos, como poliéster e náilon, não são biodegradáveis com facilidade e podem se acumular no ambiente.',
      'O livro apresenta bioplásticos feitos de fontes renováveis, como cana-de-açúcar e amido de milho, como alternativas mais sustentáveis.',
      'A indústria da moda também causa impactos: roupas descartadas incorretamente se acumulam; poliéster e náilon não se biodegradam facilmente. O livro cita montanhas de roupas no Deserto do Atacama.',
      'Reutilizar roupas, escolher fibras naturais e investir em fibras recicláveis são caminhos citados para reduzir esses impactos.'
    ],
    remember: 'Mesmo materiais naturais podem causar impactos quando são extraídos ou descartados de maneira irresponsável.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Materials_recovery_facility.jpg/1280px-Materials_recovery_facility.jpg',
    imageAlt: 'Resíduos plásticos reunidos para separação', imageCredit: 'Michal Maňas · CC BY 3.0', imageSource: 'https://commons.wikimedia.org/wiki/File:Materials_recovery_facility.jpg', page: '43–49'
  },
  {
    id: 'plasticos', icon: '♻️', title: 'Petróleo, plásticos e polímeros',
    intro: 'Na destilação fracionada, o petróleo é aquecido e suas substâncias são separadas em frações, como gasolina, GLP e nafta. A nafta é importante para a fabricação de plásticos.',
    bullets: [
      'Reações químicas industriais transformam substâncias derivadas da nafta em plásticos que podem ser moldados.',
      '<strong>Polímero</strong> é uma longa cadeia formada pela união de muitas unidades menores. O termo vem de poli (muitas) e meros (partes).',
      '<strong>1 – PET:</strong> garrafas, potes e embalagens de alimentos; pode ser reciclado para fibras têxteis e novas embalagens.',
      '<strong>2 – PEAD:</strong> frascos de produtos de limpeza e tampas; resistente e amplamente reciclado.',
      '<strong>3 – PVC:</strong> canos, mangueiras, brinquedos, molduras e isolamento elétrico; a reciclagem é limitada pela presença de aditivos.',
      '<strong>4 – PEBD:</strong> sacolas e filmes para alimentos; é reciclável, mas muitas vezes descartado incorretamente.',
      '<strong>5 – PP:</strong> potes, canudos e tampas; é leve e versátil, mas precisa estar limpo para reciclagem.',
      '<strong>6 – PS:</strong> copos descartáveis e isopor; tem reciclagem mais difícil.',
      '<strong>7 – Outros:</strong> misturas e plásticos como policarbonato e náilon; aparecem em óculos, brinquedos, eletrônicos e peças automotivas.'
    ],
    remember: 'Os números de 1 a 7 no símbolo de reciclagem ajudam a identificar o tipo de plástico.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Plastic_Recycling.jpg/1280px-Plastic_Recycling.jpg',
    imageAlt: 'Resíduos plásticos recolhidos para reciclagem', page: '49'
  },
  {
    id: 'microplasticos', icon: '🔬', title: 'Microplásticos e reciclagem',
    intro: 'Microplásticos são partículas de plástico menores que cinco milímetros.',
    bullets: [
      '<strong>Primários:</strong> já são produzidos em tamanho reduzido, como os citados em cosméticos e fibras sintéticas.',
      '<strong>Secundários:</strong> surgem da degradação de plásticos maiores, como garrafas e sacolas, pela ação da luz solar, do vento e da água.',
      'Podem ser transportados pela água, pelo ar e pelos alimentos, entrando na cadeia alimentar.',
      'A reciclagem transforma resíduos em novos produtos, reduz a extração de matérias-primas e pode gerar trabalho e renda.',
      'A reciclagem sozinha não resolve todos os impactos: o livro também destaca prevenção, redução do consumo e reutilização.',
      'O descarte de plásticos pode gerar resíduos que demoram centenas de anos para se decompor; a queima de materiais como PVC, vernizes, colas e tintas pode liberar substâncias nocivas.'
    ],
    remember: 'Uma atitude sustentável combina reduzir, reutilizar e reciclar, além de evitar desperdício e descarte inadequado.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Plastic_Recycling.jpg/1280px-Plastic_Recycling.jpg',
    imageAlt: 'Plásticos recolhidos para destinação adequada', page: '49–50'
  },
  {
    id: 'remedios', icon: '🍵', title: 'Remédios e medicamentos',
    intro: 'O livro diferencia remédio e medicamento: todo medicamento pode ser considerado um remédio, mas nem todo remédio é um medicamento.',
    bullets: [
      '<strong>Remédios:</strong> meios usados para aliviar sintomas ou ajudar na prevenção e na cura. Exemplos: chás, massagens, banho frio para amenizar febre, alimentação saudável e atividade física.',
      '<strong>Medicamentos:</strong> substâncias preparadas em farmácias ou indústrias farmacêuticas, seguindo regras técnicas e leis, para diagnosticar, prevenir, curar doenças ou aliviar sintomas.',
      'Antes do uso, medicamentos passam por testes pré-clínicos e clínicos para avaliar segurança, eficácia e possíveis efeitos colaterais.'
    ],
    remember: 'Mesmo chás e preparos caseiros podem oferecer riscos. O livro reforça o cuidado e a orientação de profissionais de saúde.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Embalagens_de_medicamentos.jpg/1280px-Embalagens_de_medicamentos.jpg',
    imageAlt: 'Embalagens variadas de medicamentos', imageCredit: 'Vitor da Silva Gonçalves · CC BY-SA 4.0', imageSource: 'https://commons.wikimedia.org/wiki/File:Embalagens_de_medicamentos.jpg', page: '52'
  },
  {
    id: 'tipos-medicamentos', icon: '🩺', title: 'Tipos de medicamentos',
    intro: 'Os medicamentos podem ter diferentes funções no organismo.',
    bullets: [
      '<strong>Profiláticos:</strong> previnem doenças. Exemplos do livro: vacinas, soros, complementos vitamínicos e antissépticos.',
      '<strong>Curativos:</strong> atuam na causa da doença. Exemplos: antibióticos, antivirais e antiparasitários.',
      '<strong>Paliativos:</strong> aliviam sintomas, mas não eliminam a causa da doença. Exemplos: anti-inflamatórios e ansiolíticos/calmantes.',
      '<strong>Diagnósticos:</strong> ajudam a identificar doenças ou problemas do corpo, como contrastes radiológicos e meios usados em exames oftálmicos.'
    ],
    remember: 'Profilático previne; curativo trata a causa; paliativo alivia sintomas; diagnóstico ajuda a identificar.',
    page: '54'
  },
  {
    id: 'tecnologia-medicamentos', icon: '⚙️', title: 'Ciência e tecnologia na saúde',
    intro: 'A tecnologia transforma a produção de medicamentos, os exames e os tratamentos. O capítulo destaca a participação de governos, universidades e empresas nesse desenvolvimento.',
    bullets: [
      'Pesquisas científicas permitem criar medicamentos novos, aperfeiçoar os já existentes e desenvolver equipamentos e exames mais precisos.',
      'A indústria farmacêutica investe em pesquisa e desenvolvimento para tornar os medicamentos mais seguros e eficazes.',
      'Os governos têm papel importante na regulamentação, no financiamento, na oferta de serviços de saúde e no acesso da população a vacinas e medicamentos.',
      'Os avanços tecnológicos ajudam a aprimorar diagnósticos, tratamentos e processos de fabricação, sempre com base em testes e evidências científicas.'
    ],
    remember: 'Ciência, tecnologia, pesquisa, regulamentação e acesso aos serviços de saúde trabalham juntos para melhorar a qualidade de vida.',
    page: '52 e 54'
  },
  {
    id: 'aspirina', icon: '📜', title: 'A história da aspirina e a tecnologia',
    intro: 'A história da aspirina mostra como observações sobre substâncias naturais, pesquisas químicas e testes científicos contribuíram para o desenvolvimento de medicamentos.',
    bullets: [
      '<strong>1500 a.C.:</strong> o Papiro de Ebers registra remédios naturais; os egípcios utilizavam folhas de salgueiro contra a dor.',
      '<strong>500 a.C.:</strong> há relatos do uso da raiz do salgueiro na China.',
      '<strong>400 a.C.:</strong> Hipócrates receitava um pó extraído da casca do salgueiro.',
      '<strong>1829:</strong> a salicina é identificada como substância relacionada ao alívio da dor e ao controle da febre.',
      '<strong>1853:</strong> Charles Frédéric Gerhardt faz modificações em laboratório no salicilato de sódio.',
      '<strong>1897:</strong> Felix Hoffmann sintetiza o ácido acetilsalicílico (AAS).',
      '<strong>1899:</strong> após testes, o medicamento começa a ser vendido com o nome de aspirina.'
    ],
    remember: 'O livro também cita a penicilina, descoberta em 1928, como marco importante para o desenvolvimento de medicamentos sintéticos. As duas referências devem ser lembradas como marcos distintos.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Embalagens_de_medicamentos.jpg/1280px-Embalagens_de_medicamentos.jpg',
    imageAlt: 'Embalagens de medicamentos', imageCredit: 'Vitor da Silva Gonçalves · CC BY-SA 4.0', imageSource: 'https://commons.wikimedia.org/wiki/File:Embalagens_de_medicamentos.jpg', page: '47 e 51'
  },
  {
    id: 'bula', icon: '📋', title: 'Bula, princípio ativo e excipientes',
    intro: 'A bula reúne informações sobre o medicamento. A composição mostra os componentes da fórmula.',
    bullets: [
      '<strong>Princípio ativo:</strong> substância responsável pelo efeito do medicamento e pelo tratamento.',
      '<strong>Excipientes:</strong> outras substâncias que auxiliam, entre outras funções, no transporte do princípio ativo pelo corpo.',
      'No exemplo do livro, a aspirina apresenta ácido acetilsalicílico como princípio ativo; amido e celulose aparecem como excipientes.',
      'A bula também informa a indicação de uso e explica a ação do medicamento no organismo.'
    ],
    remember: 'Princípio ativo = responsável pelo efeito. Excipientes = componentes que auxiliam na formulação.',
    page: '55'
  },
  {
    id: 'cuidados', icon: '🛡️', title: 'Cuidados, genéricos, similares e tarjas',
    intro: 'O uso de medicamentos exige atenção. O material reforça a leitura da bula, a prescrição e a orientação de profissionais de saúde.',
    bullets: [
      '<strong>Contraindicações:</strong> situações em que o medicamento não deve ser utilizado, por exemplo alergias ao princípio ativo ou a outros componentes e condições de saúde que interfiram no tratamento.',
      '<strong>Interações:</strong> misturas de medicamentos sem recomendação profissional ou consumo de álcool durante o tratamento podem diminuir a eficácia ou causar efeitos adversos graves.',
      'Gestantes precisam de cuidado especial e não devem usar medicamentos não indicados durante a gravidez.',
      '<strong>Validade e armazenamento:</strong> conferir a data e seguir as instruções da bula; medicamentos vencidos podem ser perigosos e perder a eficácia.',
      '<strong>Genérico:</strong> tem o mesmo princípio ativo do medicamento de referência, sem o registro do nome e da marca originais; passa por testes de equivalência e absorção pelo organismo.',
      '<strong>Similar:</strong> é equivalente ao medicamento de referência, identificado por nome comercial e marca; também passa pelos testes descritos no livro.',
      '<strong>Sem tarja:</strong> no quadro do livro, não exige receita para compra.',
      '<strong>Tarja vermelha:</strong> exige receita médica.',
      '<strong>Tarja preta:</strong> exige receita e controle maior; o livro alerta para riscos de dependência e outros danos.',
      '<strong>Tarja amarela:</strong> identifica medicamentos genéricos; a embalagem também pode ter tarja vermelha ou preta.'
    ],
    remember: 'Não se automedique. A mensagem de segurança do capítulo é utilizar medicamentos somente com orientação médica.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Embalagens_de_medicamentos.jpg/1280px-Embalagens_de_medicamentos.jpg',
    imageAlt: 'Embalagens de vários medicamentos', imageCredit: 'Vitor da Silva Gonçalves · CC BY-SA 4.0', imageSource: 'https://commons.wikimedia.org/wiki/File:Embalagens_de_medicamentos.jpg', page: '56–57'
  },
  {
    id: 'descarte', icon: '🚮', title: 'Descarte correto de medicamentos',
    intro: 'Medicamentos vencidos ou sem uso devem ser entregues em pontos de coleta de farmácias ou unidades de saúde, onde recebem tratamento e descarte especializado.',
    bullets: [
      'Não descarte medicamentos no lixo comum, na pia ou no vaso sanitário.',
      'Os princípios ativos podem contaminar o solo e a água e comprometer a vida que depende desses recursos.',
      'A coleta adequada protege o ambiente e a saúde coletiva.'
    ],
    remember: 'Medicamento vencido ou sem uso: leve a um ponto de coleta apropriado.',
    page: '57'
  },
  {
    id: 'psicoativas', icon: '🧠', title: 'Substâncias psicoativas e seus impactos',
    intro: 'Substâncias psicoativas atuam no sistema nervoso central e podem alterar humor, comportamento, percepção, sentidos e tomada de decisões.',
    bullets: [
      'Podem ter origem natural, como a cafeína do café e do guaraná, ou ser produzidas em laboratório.',
      '<strong>Lícitas:</strong> podem ser produzidas, comercializadas e consumidas sob regras e fiscalização. No Brasil, a Anvisa regula substâncias e medicamentos controlados.',
      '<strong>Ilícitas:</strong> são proibidas por lei; sua produção e venda não são permitidas. O livro cita a Lei de Drogas nº 11.343/2006 e o Sistema Nacional de Políticas Públicas sobre Drogas (SISNAD).',
      'O mecanismo de ação depende da ligação da substância aos <strong>receptores celulares</strong>, como uma chave que se encaixa em uma fechadura, ativando ou bloqueando funções biológicas. Analgésicos podem se ligar a receptores também utilizados pelas endorfinas.',
      '<strong>Dependência:</strong> necessidade física ou psicológica de consumo regular.',
      '<strong>Tolerância:</strong> quando doses cada vez maiores são necessárias para produzir o mesmo efeito.',
      '<strong>Depressoras:</strong> diminuem a atividade cerebral e podem causar relaxamento, sedação e sonolência; o abuso pode causar dependência e danos.',
      '<strong>Estimulantes:</strong> aumentam a atividade cerebral, o estado de alerta e a sensação de energia; o abuso pode causar insônia e ansiedade.',
      '<strong>Perturbadoras:</strong> alteram a percepção da realidade e podem causar alucinações e delírios.',
      '<strong>Abstinência:</strong> pode ocorrer após a interrupção do uso e incluir ansiedade, suor excessivo, insônia e convulsões.'
    ],
    remember: 'A única atitude segura em relação aos medicamentos, segundo o fechamento do capítulo, é utilizá-los apenas com orientação médica.',
    page: '53 e 59'
  }
];

export const questions: Question[] = [
  { id: 1, topic: 'Materiais naturais', question: 'Qual alternativa apresenta somente materiais naturais de origem vegetal?', options: ['Algodão e madeira', 'Náilon e poliéster', 'PET e PVC', 'Borracha sintética e couro sintético'], answer: 0, hint: 'Pense em materiais que vêm de plantas.', explanation: 'Algodão e madeira têm origem vegetal e são encontrados na natureza.', page: '45' },
  { id: 2, topic: 'Recursos naturais', question: 'O que caracteriza um recurso natural renovável?', options: ['Leva milhões de anos para se formar', 'Pode ser regenerado pela natureza em período relativamente curto', 'Nunca acaba, mesmo com uso exagerado', 'É sempre produzido em laboratório'], answer: 1, hint: 'A palavra está ligada à possibilidade de se renovar.', explanation: 'O livro define renováveis como recursos que podem ser regenerados pela natureza em períodos relativamente curtos.', page: '45' },
  { id: 3, topic: 'Recursos naturais', question: 'Qual grupo é formado por recursos não renováveis citados no livro?', options: ['Algodão, lã e madeira', 'Petróleo, carvão e minerais', 'Seda, algodão e madeira', 'Folhas, frutas e madeira de reflorestamento'], answer: 1, hint: 'Esses recursos podem levar milhões de anos para se formar.', explanation: 'Petróleo, carvão e minerais são exemplos de recursos não renováveis.', page: '45' },
  { id: 4, topic: 'Materiais manufaturados', question: 'O que são materiais manufaturados de origem natural?', options: ['Materiais encontrados prontos na natureza', 'Materiais naturais que passam por transformações antes do uso', 'Materiais que só existem em laboratórios', 'Materiais que não podem ser transformados'], answer: 1, hint: 'Pense no algodão que vira tecido.', explanation: 'O algodão precisa ser fiado e a madeira pode ser cortada e lixada antes de virar produto.', page: '45' },
  { id: 5, topic: 'Materiais sintéticos', question: 'O que significa sintetizar, na Química?', options: ['Separar materiais por tamanho', 'Formar substâncias novas pela combinação de outras substâncias', 'Congelar uma substância', 'Retirar água de um material'], answer: 1, hint: 'É formar algo novo a partir de outras substâncias.', explanation: 'O capítulo explica que sintetizar significa formar substâncias novas por combinação de outras.', page: '45' },
  { id: 6, topic: 'Materiais sintéticos', question: 'Qual alternativa reúne fibras sintéticas citadas no capítulo?', options: ['Algodão, lã e seda', 'Náilon, poliéster e elastano', 'Madeira, couro e linho', 'Areia, ferro e carvão'], answer: 1, hint: 'Esses materiais são usados em roupas e tecidos artificiais.', explanation: 'Náilon, poliéster e elastano são fibras sintéticas muito usadas na indústria têxtil.', page: '47' },
  { id: 7, topic: 'Impactos ambientais', question: 'Qual recurso não renovável é matéria-prima importante para muitos materiais sintéticos?', options: ['Luz solar', 'Petróleo', 'Vento', 'Água da chuva'], answer: 1, hint: 'É usado pela indústria petroquímica.', explanation: 'Muitos materiais sintéticos, como plásticos e fibras artificiais, são fabricados a partir de recursos como o petróleo.', page: '44 e 48' },
  { id: 8, topic: 'Impactos ambientais', question: 'Qual impacto pode ser causado pela extração e pelo processamento do petróleo?', options: ['Poluição do solo, da água e do ar', 'Transformação imediata de plástico em água', 'Fim de todas as doenças', 'Aumento automático das florestas'], answer: 0, hint: 'Pense nos efeitos sobre o ambiente e comunidades próximas.', explanation: 'O capítulo cita poluição do solo, da água e do ar e efeitos sobre a saúde de comunidades próximas.', page: '48' },
  { id: 9, topic: 'Impactos ambientais', question: 'Por que o uso de madeira de reflorestamento é apresentado como alternativa?', options: ['Porque não precisa de água', 'Porque ajuda a reduzir a pressão sobre florestas naturais', 'Porque transforma madeira em petróleo', 'Porque impede qualquer impacto ambiental'], answer: 1, hint: 'A alternativa ajuda a evitar o corte de florestas nativas.', explanation: 'O cultivo de espécies para fins industriais pode reduzir a pressão sobre florestas naturais.', page: '49' },
  { id: 10, topic: 'Impactos ambientais', question: 'O que pode acontecer na mineração artesanal de ouro descrita no livro?', options: ['O mercúrio pode contaminar água, peixes e comunidades', 'A água se transforma em petróleo', 'O ouro desaparece sem deixar resíduos', 'O solo fica automaticamente fértil'], answer: 0, hint: 'O texto cita uma substância tóxica usada na extração artesanal.', explanation: 'O mercúrio pode liberar vapores tóxicos e deixar resíduos metálicos que contaminam o ambiente.', page: '49' },
  { id: 11, topic: 'Alternativas sustentáveis', question: 'Quais fontes renováveis são citadas para fabricar bioplásticos?', options: ['Petróleo e carvão', 'Cana-de-açúcar e amido de milho', 'Ferro e cobre', 'Areia e granito'], answer: 1, hint: 'Uma é uma planta muito usada para produzir açúcar; a outra vem do milho.', explanation: 'O livro cita cana-de-açúcar e amido de milho como fontes renováveis para bioplásticos.', page: '48' },
  { id: 12, topic: 'Plásticos', question: 'Na destilação fracionada do petróleo, qual fração é essencial para a produção de plásticos?', options: ['Nafta', 'Água', 'Sal', 'Areia'], answer: 0, hint: 'O nome aparece destacado no início da página sobre plásticos.', explanation: 'A nafta é uma fração do petróleo utilizada como matéria-prima para produzir plásticos.', page: '49' },
  { id: 13, topic: 'Plásticos', question: 'O que é um polímero?', options: ['Uma única partícula de água', 'Uma longa cadeia formada pela união de muitas unidades', 'Um tipo de minério', 'Um medicamento sem princípio ativo'], answer: 1, hint: 'A palavra é explicada por “poli” e “meros”.', explanation: 'Poli significa muitas e meros significa partes; polímero é uma cadeia de muitas unidades.', page: '49' },
  { id: 14, topic: 'Plásticos', question: 'O plástico PET é muito utilizado para fabricar:', options: ['Garrafas e embalagens de alimentos', 'Canos e isolamento elétrico', 'Somente pneus', 'Apenas lentes de óculos'], answer: 0, hint: 'Pense em embalagens transparentes de bebidas.', explanation: 'O PET é usado em garrafas plásticas, potes e embalagens de alimentos.', page: '49' },
  { id: 15, topic: 'Plásticos', question: 'Qual plástico é usado em canos, mangueiras e isolamento elétrico?', options: ['PET', 'PVC', 'PS', 'PEBD'], answer: 1, hint: 'A sigla tem três letras e começa com P.', explanation: 'O PVC é usado em canos, mangueiras, molduras de janelas e isolamento elétrico.', page: '49' },
  { id: 16, topic: 'Plásticos', question: 'Qual tipo de plástico aparece em sacolas e filmes para alimentos?', options: ['PEBD', 'PET', 'PVC', 'PS'], answer: 0, hint: 'É o número 4 na classificação apresentada.', explanation: 'O PEBD é utilizado em sacolas plásticas e filmes para alimentos.', page: '49' },
  { id: 17, topic: 'Microplásticos', question: 'Qual é o tamanho dos microplásticos segundo o capítulo?', options: ['Menores que 5 milímetros', 'Maiores que 5 metros', 'Exatamente 1 quilômetro', 'Sempre invisíveis a qualquer instrumento'], answer: 0, hint: 'A medida é menor que meio centímetro.', explanation: 'O capítulo define microplásticos como partículas menores que cinco milímetros.', page: '49' },
  { id: 18, topic: 'Microplásticos', question: 'Como surgem os microplásticos secundários?', options: ['São produzidos desde o início em tamanho reduzido', 'Resultam da degradação de plásticos maiores', 'São formados por folhas de árvores', 'São criados por vacinas'], answer: 1, hint: 'Eles vêm de garrafas e sacolas que se fragmentam.', explanation: 'A ação da luz solar, do vento e da água degrada plásticos maiores em partículas menores.', page: '49' },
  { id: 19, topic: 'Microplásticos', question: 'Por quais meios os microplásticos podem se espalhar?', options: ['Água, ar e alimentos', 'Somente pelo fogo', 'Apenas por aparelhos eletrônicos', 'Somente por rochas'], answer: 0, hint: 'Pense em rios, vento e cadeia alimentar.', explanation: 'O livro cita transporte pela água, pelo ar e entrada na cadeia alimentar.', page: '49' },
  { id: 20, topic: 'Reciclagem', question: 'Qual é um benefício da reciclagem apresentado no capítulo?', options: ['Reduzir a extração de matérias-primas e gerar trabalho', 'Eliminar a necessidade de consumo consciente', 'Fazer todo resíduo desaparecer imediatamente', 'Impedir qualquer poluição sem outras ações'], answer: 0, hint: 'Ela traz benefício ambiental e social.', explanation: 'A reciclagem transforma resíduos em novos produtos, reduz a extração de matérias-primas e pode gerar emprego e renda.', page: '50' },
  { id: 21, topic: 'Reciclagem', question: 'Por que a reciclagem, sozinha, não resolve todos os problemas ambientais?', options: ['Porque também é importante reduzir o consumo e reutilizar', 'Porque plástico nunca pode ser reciclado', 'Porque todo material natural é poluente', 'Porque não existe coleta seletiva'], answer: 0, hint: 'Pense nas outras atitudes sustentáveis do capítulo.', explanation: 'O livro destaca prevenção, redução, reutilização e consumo responsável além da reciclagem.', page: '50' },
  { id: 22, topic: 'Medicamentos', question: 'Qual frase expressa corretamente a diferença entre remédio e medicamento?', options: ['Todo remédio é medicamento', 'Todo medicamento pode ser remédio, mas nem todo remédio é medicamento', 'Remédio e medicamento nunca aliviam sintomas', 'Medicamento é sempre um chá caseiro'], answer: 1, hint: 'O livro destaca uma relação de inclusão, não de igualdade.', explanation: 'Chás, massagens e hábitos saudáveis podem ser remédios; medicamentos são preparados sob regras técnicas e legais.', page: '52' },
  { id: 23, topic: 'Medicamentos', question: 'Para que servem os testes pré-clínicos e clínicos?', options: ['Avaliar segurança, eficácia e possíveis efeitos colaterais', 'Escolher a cor da embalagem', 'Aumentar o preço do produto', 'Substituir a bula'], answer: 0, hint: 'Os testes seguem o método científico antes do uso pelas pessoas.', explanation: 'Os testes ajudam a verificar se o medicamento é seguro e eficaz e quais riscos pode apresentar.', page: '52' },
  { id: 24, topic: 'Medicamentos', question: 'Qual tipo de medicamento é usado para prevenir doenças?', options: ['Profilático', 'Paliativo', 'Diagnóstico', 'Curativo'], answer: 0, hint: 'O nome está relacionado à prevenção.', explanation: 'Profiláticos ajudam a prevenir doenças; vacinas são um exemplo citado.', page: '54' },
  { id: 25, topic: 'Medicamentos', question: 'Qual tipo de medicamento alivia sintomas, mas não elimina a causa da doença?', options: ['Curativo', 'Paliativo', 'Diagnóstico', 'Profilático'], answer: 1, hint: 'Pense em aliviar dor, febre ou ansiedade.', explanation: 'Paliativos melhoram o conforto e aliviam sintomas, sem eliminar a causa da doença.', page: '54' },
  { id: 26, topic: 'Medicamentos', question: 'O que é o princípio ativo de um medicamento?', options: ['A embalagem externa', 'A substância responsável pelo efeito do medicamento', 'A cor da tarja', 'O papel da bula'], answer: 1, hint: 'É o componente que produz o efeito esperado.', explanation: 'O princípio ativo é a substância responsável pelo efeito do medicamento e pelo tratamento.', page: '55' },
  { id: 27, topic: 'Medicamentos', question: 'Qual é a função dos excipientes?', options: ['Auxiliar na formulação e no transporte do princípio ativo', 'Substituir a orientação médica', 'Tornar o medicamento vencido', 'Indicar a cor da tarja'], answer: 0, hint: 'São componentes além do principal.', explanation: 'Os excipientes são outras substâncias presentes na composição que auxiliam, por exemplo, no transporte do princípio ativo.', page: '55' },
  { id: 28, topic: 'Medicamentos', question: 'O que caracteriza um medicamento genérico?', options: ['Tem o mesmo princípio ativo do medicamento de referência', 'Não possui princípio ativo', 'É feito somente de plantas', 'Não passa por testes'], answer: 0, hint: 'O livro compara sua composição com o medicamento de referência.', explanation: 'O genérico tem o mesmo princípio ativo do original e passa por testes de equivalência.', page: '56' },
  { id: 29, topic: 'Medicamentos', question: 'O que a tarja amarela identifica no quadro do livro?', options: ['Medicamentos genéricos', 'Medicamentos sem validade', 'Produtos de limpeza', 'Medicamentos proibidos'], answer: 0, hint: 'Observe o símbolo G e a palavra genérico.', explanation: 'A tarja amarela identifica genéricos; a embalagem também pode ter tarja vermelha ou preta.', page: '57' },
  { id: 30, topic: 'Medicamentos', question: 'O que se deve fazer com medicamentos vencidos ou sem uso?', options: ['Jogar na pia', 'Descartar no vaso sanitário', 'Levar a pontos de coleta em farmácias ou unidades de saúde', 'Queimar em casa'], answer: 2, hint: 'O capítulo indica locais que recebem esses produtos para descarte especializado.', explanation: 'Medicamentos vencidos ou sem uso devem ser entregues a pontos de coleta apropriados.', page: '57' },
  { id: 31, topic: 'Substâncias psicoativas', question: 'Onde atuam as substâncias psicoativas?', options: ['No sistema nervoso central', 'Somente nos ossos', 'Apenas na pele', 'Somente no sistema digestório'], answer: 0, hint: 'Elas alteram humor, comportamento e percepção.', explanation: 'As substâncias psicoativas atuam no sistema nervoso central.', page: '53' },
  { id: 32, topic: 'Substâncias psicoativas', question: 'O que é tolerância?', options: ['Quando doses cada vez maiores são necessárias para o mesmo efeito', 'Quando a pessoa nunca sente efeito', 'Quando o medicamento muda de cor', 'Quando a substância é descartada'], answer: 0, hint: 'O organismo passa a responder menos à mesma quantidade.', explanation: 'O livro define tolerância como a necessidade de doses maiores para produzir o mesmo efeito.', page: '53' },
  { id: 33, topic: 'Substâncias psicoativas', question: 'Qual é o efeito das substâncias depressoras?', options: ['Diminuem a atividade cerebral', 'Aumentam a atividade cerebral', 'Não alteram o cérebro', 'Apenas mudam a cor dos olhos'], answer: 0, hint: 'Elas podem causar relaxamento e sonolência.', explanation: 'Depressoras diminuem a atividade cerebral e podem reduzir atenção e concentração.', page: '59' },
  { id: 34, topic: 'Substâncias psicoativas', question: 'Qual é o efeito das substâncias estimulantes?', options: ['Aumentam a atividade cerebral', 'Diminuem sempre a percepção da realidade', 'Impedem qualquer sensação', 'Eliminam a necessidade de dormir'], answer: 0, hint: 'Elas podem aumentar o alerta e a sensação de energia.', explanation: 'Estimulantes aumentam a atividade cerebral, o estado de alerta e a sensação de energia.', page: '59' },
  { id: 35, topic: 'Substâncias psicoativas', question: 'O que as substâncias perturbadoras podem causar?', options: ['Alterações na percepção da realidade, como alucinações', 'Apenas relaxamento muscular', 'Aumento da reciclagem', 'Transformação de plástico em algodão'], answer: 0, hint: 'O nome está relacionado a perturbar a percepção.', explanation: 'Perturbadoras alteram a percepção da realidade e podem provocar alucinações e delírios.', page: '59' },
  { id: 36, topic: 'Segurança', question: 'Qual é a atitude segura em relação ao uso de medicamentos destacada no capítulo?', options: ['Usar somente com orientação médica', 'Tomar o que funcionou com um amigo', 'Dobrar a dose se não fizer efeito', 'Misturar medicamentos por conta própria'], answer: 0, hint: 'É a frase de destaque no encerramento do capítulo.', explanation: 'O capítulo reforça que medicamentos devem ser utilizados apenas com orientação médica.', page: '56 e 59' },
  { id: 37, topic: 'Plásticos', question: 'Por que o PVC merece atenção no descarte e na queima?', options: ['A queima pode emitir substâncias nocivas', 'É sempre biodegradável', 'Transforma-se em água pura', 'Não contém aditivos'], answer: 0, hint: 'O livro cita PVC entre os materiais cuja queima pode liberar substâncias nocivas.', explanation: 'A queima de materiais como PVC, vernizes, colas e tintas pode emitir substâncias nocivas.', page: '50' },
  { id: 38, topic: 'Substâncias psicoativas', question: 'O que é dependência?', options: ['Necessidade física ou psicológica de consumo regular', 'A capacidade de reciclar plástico', 'Uma forma de armazenar medicamentos', 'O mesmo que validade'], answer: 0, hint: 'Está ligada à necessidade de continuar consumindo.', explanation: 'O livro descreve dependência como necessidade física ou psicológica de consumo regular.', page: '53 e 59' },
  { id: 39, topic: 'Ambiente', question: 'O que é liberado na queima de carvão mineral e petróleo por causa do carbono presente nesses combustíveis?', options: ['Gás carbônico (CO₂)', 'Oxigênio puro', 'Amido de milho', 'Látex'], answer: 0, hint: 'É um gás associado ao efeito estufa.', explanation: 'O livro explica que a combustão de carvão mineral e petróleo libera gás carbônico (CO₂).', page: '44' },
  { id: 40, topic: 'Ambiente', question: 'Por que o livro apresenta o reflorestamento com pinus e eucalipto como alternativa?', options: ['Para reduzir a pressão sobre florestas naturais', 'Para aumentar o corte de árvores nativas', 'Para substituir todos os materiais minerais', 'Para produzir petróleo'], answer: 0, hint: 'Essas espécies são cultivadas para fins industriais.', explanation: 'O reflorestamento com espécies cultivadas para uso industrial ajuda a reduzir a pressão sobre florestas naturais.', page: '49' },
  { id: 41, topic: 'Ambiente', question: 'Por que o descarte de roupas de poliéster e náilon preocupa?', options: ['Porque essas fibras não se biodegradam facilmente e podem se acumular', 'Porque viram água em poucas horas', 'Porque são sempre feitas de algodão', 'Porque não podem ser usadas em roupas'], answer: 0, hint: 'Pense no acúmulo de resíduos da indústria da moda.', explanation: 'O livro mostra que fibras sintéticas como poliéster e náilon não são biodegradáveis com facilidade e podem se acumular no ambiente.', page: '49' },
  { id: 42, topic: 'Substâncias psicoativas', question: 'O que diferencia substâncias psicoativas lícitas de ilícitas?', options: ['As lícitas são permitidas sob regras; as ilícitas são proibidas por lei', 'As lícitas não atuam no cérebro', 'As ilícitas são sempre naturais', 'Não existe diferença legal entre elas'], answer: 0, hint: 'A diferença envolve a legislação e a fiscalização.', explanation: 'O capítulo define substâncias lícitas como permitidas sob regras e ilícitas como proibidas por lei.', page: '53' },
  { id: 43, topic: 'Substâncias psicoativas', question: 'Como o capítulo compara a ligação de uma substância a um receptor celular?', options: ['A uma chave que se encaixa em uma fechadura', 'A uma roupa que vira tecido', 'A um plástico que se dissolve', 'A um minério que vira areia'], answer: 0, hint: 'O exemplo aparece no tópico “Mecanismo de ação”.', explanation: 'A substância se liga a receptores celulares como uma chave em uma fechadura, podendo ativar ou bloquear funções biológicas.', page: '53' },
  { id: 44, topic: 'Transformações da matéria', question: 'Qual situação é um exemplo de transformação física?', options: ['Cortar e lixar madeira para fabricar um móvel', 'Queimar carvão e liberar gás carbônico', 'Produzir um polímero por reação química', 'Sintetizar uma nova substância em laboratório'], answer: 0, hint: 'A forma muda, mas a madeira continua sendo madeira.', explanation: 'Cortar e lixar mudam a forma e o tamanho da madeira sem produzir uma nova substância; por isso são transformações físicas.', page: '43–46' },
  { id: 45, topic: 'Transformações da matéria', question: 'O que caracteriza uma transformação química?', options: ['A formação de uma ou mais novas substâncias', 'Apenas mudar o formato de um objeto', 'Somente diminuir o tamanho de um material', 'Apenas separar objetos por cor'], answer: 0, hint: 'Pense no que acontece quando uma reação química ocorre.', explanation: 'Em uma transformação química, as substâncias iniciais participam de reações que formam novas substâncias, como na síntese de materiais e na combustão.', page: '46–50' },
];

export const trueFalseItems = [
  { text: 'O petróleo é um recurso natural não renovável.', answer: true, why: 'Ele leva milhões de anos para se formar e não é rapidamente reposto.' },
  { text: 'O algodão precisa passar por processos antes de virar tecido.', answer: true, why: 'O livro mostra a colheita, o processamento e a transformação em fio e tecido.' },
  { text: 'Materiais sintéticos são encontrados diretamente na natureza, já prontos.', answer: false, why: 'Eles são produzidos por transformações químicas e físicas em laboratórios e indústrias.' },
  { text: 'O PET é usado em garrafas e embalagens.', answer: true, why: 'Essa é uma das utilizações indicadas para o PET.' },
  { text: 'Microplásticos são partículas maiores que cinco centímetros.', answer: false, why: 'O capítulo os define como partículas menores que cinco milímetros.' },
  { text: 'A reciclagem substitui totalmente a necessidade de reduzir e reutilizar.', answer: false, why: 'O capítulo mostra que reduzir e reutilizar também são importantes.' },
  { text: 'Todo remédio é necessariamente um medicamento preparado em laboratório.', answer: false, why: 'Chás e hábitos saudáveis podem ser considerados remédios, mas não são medicamentos.' },
  { text: 'O princípio ativo é responsável pelo efeito do medicamento.', answer: true, why: 'É a substância que produz o efeito esperado no tratamento.' },
  { text: 'Os excipientes são componentes que podem auxiliar no transporte do princípio ativo.', answer: true, why: 'Essa função é explicada na página sobre a bula.' },
  { text: 'A tarja amarela identifica medicamentos genéricos.', answer: true, why: 'A página de tarjas apresenta essa identificação.' },
  { text: 'Medicamentos vencidos podem ser jogados no vaso sanitário.', answer: false, why: 'Devem ser entregues em pontos de coleta apropriados.' },
  { text: 'Substâncias psicoativas atuam no sistema nervoso central.', answer: true, why: 'Elas podem modificar humor, comportamento e percepção.' },
  { text: 'Substâncias estimulantes diminuem a atividade cerebral.', answer: false, why: 'Elas aumentam a atividade cerebral.' },
  { text: 'Substâncias perturbadoras podem alterar a percepção da realidade.', answer: true, why: 'O capítulo cita alucinações e delírios como possíveis efeitos.' },
  { text: 'O genérico tem o mesmo princípio ativo do medicamento de referência.', answer: true, why: 'Essa é a característica apresentada no livro.' },
  { text: 'A queima de alguns materiais pode liberar substâncias nocivas.', answer: true, why: 'O capítulo cita PVC, vernizes, colas e tintas.' }
];

export const memoryPairs = [
  ['PET', 'Garrafas e embalagens de alimentos'],
  ['PVC', 'Canos, mangueiras e isolamento elétrico'],
  ['PEBD', 'Sacolas e filmes para alimentos'],
  ['PP', 'Potes, canudos e tampas'],
  ['Princípio ativo', 'Substância responsável pelo efeito do medicamento'],
  ['Excipientes', 'Componentes que auxiliam na formulação'],
  ['Microplásticos', 'Partículas menores que 5 milímetros'],
  ['Tarja amarela', 'Identifica medicamentos genéricos'],
  ['Profilático', 'Ajuda a prevenir doenças'],
  ['Paliativo', 'Alivia sintomas'],
  ['Tolerância', 'Doses maiores para obter o mesmo efeito'],
  ['Reciclagem', 'Transforma resíduos em novos produtos']
];

export const matchPairs = [
  ['O que é um polímero?', 'Uma longa cadeia formada pela união de muitas unidades menores'],
  ['Qual plástico é comum em garrafas?', 'PET'],
  ['O que é o princípio ativo?', 'Substância responsável pelo efeito do medicamento'],
  ['O que identifica a tarja amarela?', 'Medicamentos genéricos'],
  ['O que são microplásticos?', 'Partículas menores que cinco milímetros'],
  ['Para que serve um profilático?', 'Para ajudar a prevenir doenças'],
  ['O que é tolerância?', 'Precisar de doses maiores para obter o mesmo efeito'],
  ['Onde levar medicamentos vencidos?', 'A um ponto de coleta em farmácia ou unidade de saúde']
];

export const relationPairs = [
  ['Material natural', 'Algodão, madeira, lã e couro'],
  ['Material sintético', 'Náilon, poliéster e elastano'],
  ['Petróleo', 'Matéria-prima da indústria petroquímica'],
  ['Nafta', 'Fração do petróleo usada para produzir plásticos'],
  ['Bioplástico', 'Pode ser feito de fonte renovável, como amido de milho'],
  ['Microplástico primário', 'Já é produzido em tamanho reduzido'],
  ['Microplástico secundário', 'Surge da degradação de plásticos maiores'],
  ['Excipiente', 'Componente que auxilia na formulação do medicamento'],
  ['Medicamento similar', 'Equivalente ao de referência, com nome comercial e marca'],
  ['Abstinência', 'Conjunto de sintomas após interromper o uso de uma substância']
];

export const columnsPairs = [
  ['Recurso renovável', 'Pode ser regenerado pela natureza em período relativamente curto'],
  ['Recurso não renovável', 'Leva milhões de anos para se formar'],
  ['Polímero', 'Longa cadeia de muitas unidades menores'],
  ['Profilático', 'Previne doenças'],
  ['Curativo', 'Atua na causa da doença'],
  ['Paliativo', 'Alivia sintomas'],
  ['Diagnóstico', 'Ajuda a identificar doenças'],
  ['Tarja vermelha', 'Exige receita médica'],
  ['Tarja preta', 'Exige receita e controle maior'],
  ['Reciclagem', 'Transforma resíduos em novos produtos']
];

export const wordSearchWords = ['PLASTICO', 'PETROLEO', 'POLIMERO', 'RECICLAGEM', 'SINTETICO', 'BULA', 'TARJA', 'EXCIPIENTE'];
