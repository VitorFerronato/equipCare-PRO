# Geral
    - Por enquanto que não tem backend, fazer o calculo do semáforo no próprio front
    - Alterar as cores das tabelas
    - Transformar a modal de items e de filtros em um componente só
    - Separar a store por funcionalidade
    - Transformar o addDaysToDate e getTodayDate e gerar id em uma função do utils
    - Tabela esta clonando valores ao filtrar [ BUG ]
    - chamar os endpoints de items e categorias e listagem somente se a store estiver vazia
    - Fixar sidebar

# Filtros
    - Inserir filtro de busca
    - Adicionar filtro de categoria e item
    
# Listagem de equipamentos
    - Ao marcar um equipamento para fazer a ordem de serviço, exibir um icone com um tooltip nos outros dizendo que nao pode ser feita ordem de equipamentos diferentes
    - Ordenar por ordem de urgência

# Adicionar equipamentos


# Adicionar Serviços
    - Tooltip no campo da próxima manutenção com o calculo feito
    - Mostrar uma mensagem com confirmação caso o usuario selecione uma data manual e ela passe do tempo de manutenção
    - Disabled ou if nas datas caso tenha ordem de serviço
    - Fazer a cor do semaforo no front dependendo da data

# Ordem de serviço
    - Endpoint de criar ordem de serviço
   - Enviar todo o equipamento e não só aquele que eu marquei para a manutenção
   - Limpar ordem ao salvar

# Histórico de Ordem de serviço
    - Em progresso
    - Adicionar id unico por ordem "001"

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
    - Desabilitar botão de criar serviços caso campos horas por dia ou dias por semana forem igual a 0
    - Ordem de serviço
        - Agora, só podemos adicionar um equipamento por ordem, exibira uma mensagem informando caso o usuario tente adicionar mais de um equipamento
        - Removido campos de responsável e data da realização
    - Pop up para confirmar exclusão de equipamento