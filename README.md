# Requisitos Funcionais (RF)

1. **RF001 - Criação de Transação**
   - O sistema deve permitir que o usuário crie uma nova transação.
   - A transação pode ser do tipo "crédito" ou "débito".
   - O usuário deve fornecer os detalhes da transação, como valor e tipo.

2. **RF002 - Obter Resumo da Conta**
   - O sistema deve fornecer um resumo da conta do usuário, incluindo o saldo atual.
   - O resumo deve ser baseado em todas as transações realizadas pelo usuário.

3. **RF003 - Listagem de Transações**
   - O sistema deve listar todas as transações realizadas pelo usuário.
   - Cada transação listada deve incluir informações como data, valor, tipo e descrição.

4. **RF004 - Visualização de Transação Específica**
   - O sistema deve permitir que o usuário visualize os detalhes de uma transação específica.
   - Os detalhes incluem valor, tipo, data e descrição.

# Regras de Negócio (RN)

1. **RN001 - Tipos de Transação**
   - A transação deve ser categorizada como "crédito" ou "débito".
   - Transações de crédito devem aumentar o saldo do usuário.
   - Transações de débito devem diminuir o saldo do usuário.

2. **RN002 - Identificação de Usuário**
   - Cada transação deve estar associada a um usuário específico.
   - O sistema deve ser capaz de identificar o usuário responsável por cada transação.

3. **RN003 - Permissão de Visualização**
   - O usuário deve poder visualizar apenas as transações que ele próprio criou.
   - O sistema deve impedir que um usuário visualize as transações de outro usuário.

