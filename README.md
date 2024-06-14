# Geral
    - Alterar as cores das tabelas
    - Refazer a modal de selecionar items e categorias no service-card, usar o vueX ( REFACTOR )
    - Fazer uma tela de loading ao carregar o projeto, que vai chamar os endpoint de listar os items, categorias e listagem de equipamentos, só assim abrir o projeto
    - Transformar a modal de items e de filtros em um componente só
    - Separar a store por funcionalidade
    - Arrumar o fluxo de items e categorias, esta fazendo muitas chamadas
    - Ao criar um novo equipamento, excluir, editar, chamar novamente o endpoint de listagem, que agora nao esta mais sendo chamado ao acessar a tela list-equipments
    - Transformar o addDaysToDate em uma função do utils
# Filtros
    - Adicionar filtro de categoria e item

# Listagem de equipamentos

# Adicionar equipamentos

# Adicionar Serviços
    - Tooltip no campo da próxima manutenção com o calculo feito

# Ordem de serviço
    - Opção para selecionar todos os serviços de um equipamento
    - Limpar store quando sair da tela de listagem
    - Ao confirmar a ordem, atualizar o realized e a data para a próxima manutenção do equipamento

    # DUVIDAS
    - O que precisa ter, (nome de quem vai fazer, etc)
    - As manutenções tem que acontecer no mesmo dia?

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