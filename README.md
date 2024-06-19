# Geral
    - Por enquanto que não tem backend, fazer o calculo do semáforo no próprio front
    - Alterar as cores das tabelas
    - Refazer a modal de selecionar items e categorias no service-card, usar o vueX ( REFACTOR )
    - Fazer uma tela de loading ao carregar o projeto, que vai chamar os endpoint de listar os items, categorias e listagem de equipamentos, só assim abrir o projeto
    - Transformar a modal de items e de filtros em um componente só
    - Separar a store por funcionalidade
    - Arrumar o fluxo de items e categorias, esta fazendo muitas chamadas
    - Ao criar um novo equipamento, excluir, editar, chamar novamente o endpoint de listagem, que agora nao esta mais sendo chamado ao acessar a tela list-equipments
    - Transformar o addDaysToDate em uma função do utils

# Filtros
    - Inserir filtro de busca
    - Adicionar filtro de categoria e item
    
# Listagem de equipamentos
    - Ao marcar um equipamento para fazer a ordem de serviço, exibir um icone com um tooltip nos outros dizendo que nao pode ser feita ordem de equipamentos diferentes

# Adicionar equipamentos

# Adicionar Serviços
    - Tooltip no campo da próxima manutenção com o calculo feito
    - Modal para confirmação de excluir equipamento
    - Mostrar uma mensagem com confirmação caso o usuario selecione uma data manual e ela passe do tempo de manutenção

# Ordem de serviço
    - Opção para selecionar todos os serviços de um equipamento
    - Ao confirmar a ordem, atualizar o realized e a data para a próxima manutenção do equipamento
    - Adicionar id unico por ordem "001"

# Histórico de Ordem de serviço
    - Em progresso

 =====================================================================================================================

# PATCH NOTE 04/06/2024
    - Adicionado opção para adicionar item e categoria diretamente na criação do serviço
    - UpperCase em todos os textos das tabelas
    - Na listagem de equipamentos, permitido buscar pela tag do equipamento também

# PATCH NOTE 06/06/2024
    - Opção de inserir data manualmente ao criar um serviço
    - Criação da pop-up de ordem de serviço
    - Opção para deletar equipamento
    - Esconder paginação das tabelas caso numero de items for inferior a 5
    - Tela de loading de Bem vindo

## PATCH NOTE 18/06/2024
    - Listagem de equipamentos e manutenções em uma unica tabela na home
    - Desabilitar botão de criar equipamento caso campos horas por dia ou dias por semana forem igual a 0
    - Ordem de serviço
        - Agora, só podemos adicionar um equipamento por ordem, exibira uma mensagem informando caso o usuario tente adicionar mais de um equipamento
        - Removido campos de responsável e data da realização