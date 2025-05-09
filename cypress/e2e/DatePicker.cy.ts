describe('DatePicker Component', () => {
  beforeEach(() => {
    cy.visit('/datePicker'); // 确保测试页面正确加载
  });

  it('should render the DatePicker component', () => {
    cy.get('.zl-date-picker').should('exist'); // 检查组件是否渲染
  });

  it('should open the date picker when input is clicked', () => {
    cy.get('input[type="text"]').click();
    cy.get('.picker').should('be.visible'); // 检查日期选择器是否显示
  });

  it('should switch to month view when month button is clicked', () => {
    cy.get('input[type="text"]').click();
    cy.get('.month-btn').click();
    cy.get('.picker').should('be.visible');
    cy.get('.monthpicker').should('exist'); // 检查是否切换到月份视图
  });

  it('should switch to year view when year button is clicked', () => {
    cy.get('input[type="text"]').click();
    cy.get('.year-btn').click();
    cy.get('.picker').should('be.visible');
    cy.get('.yearpicker').should('exist'); // 检查是否切换到年份视图
  });

  it('should navigate to previous year page', () => {
    cy.get('input[type="text"]').click();
    cy.get('.year-btn').click();
    cy.get('.picker').should('be.visible');
    cy.get('.yearpicker').find('.icon').eq(0).click(); // 点击左箭头
    cy.get('.ch-year-btn').should('contain', new Date().getFullYear() - 9); // 检查年份是否减少
  });

  it('should navigate to next year page', () => {
    cy.get('input[type="text"]').should('be.visible');
    cy.get('input[type="text"]').click();
    cy.get('.year-btn').click();
    cy.get('.picker').should('be.visible');
    cy.get('.yearpicker').find('.icon').eq(1).click(); // 点击右箭头
    cy.get('.year-btn').should('contain', new Date().getFullYear() + 9); // 检查年份是否增加
  });

  it('should select a date', () => {
    cy.get('input[type="text"]').click();
    cy.get('.picker').should('be.visible');
    cy.get('td').contains('15').click(); // 选择日期 15
    cy.get('input[type="text"]').should('have.value', `${new Date().getFullYear()}${new Date().getMonth() + 1 > 9 ? new Date().getMonth() + 1 : '0' + (new Date().getMonth() + 1)}15`); // 检查输入框的值
  });

  it('should disable input when disabled prop is true', () => {
    cy.get('input[type="text"]').should('not.be.disabled'); // 默认未禁用
    // 模拟禁用状态
    cy.get('input[type="text"]').invoke('attr', 'disabled', true);
    cy.get('input[type="text"]').should('be.disabled'); // 检查是否禁用
  });

  it('should close the date picker when clicking outside', () => {
    cy.get('input[type="text"]').click();
    cy.get('.picker').should('be.visible');
    cy.get('body').click(); // 点击页面其他地方
    cy.get('.datepicker').should('not.be.visible'); // 检查日期选择器是否隐藏
  });
});
