<?php
/**
 * Administration form for module configuration
 */
function plus_search_simple2_admin_form($form, &$form_state){
    $form = array();

    $form['search_alternatives'] = array(
      '#type' => 'fieldset', 
      '#title' => t('Alternative search options'),
      '#weight' => 1, 
      '#collapsible' => TRUE, 
      '#collapsed' => FALSE,
    );
    $form['search_alternatives']['plus_search_menu_on'] = array(
      '#type' => 'checkbox', 
      '#title' => t('Display alternative search options'),
      '#description' => t('Use the specified menu (below) to present some alternative search options as a list menu within the search block'),
      '#default_value' => variable_get('plus_search_menu_on', 0),
    );
    // $form['search_alternatives']['plus_search_menu_name'] = array(
    //     '#title' => 'Alternative search menu',
    //     '#description' => t('Specify the machine name of the menu to be used for alternative search options - eg <em>menu-search-menu</em>'),
    //     '#type' => 'textfield',
    //     '#default_value' => variable_get('plus_search_menu_name', 'menu-search-menu'),
    // );
    $form['search_alternatives']['plus_search_menu_name'] = array(
       '#type' => 'select',
       '#title' => t('Selected'),
       '#options' => menu_get_menus(FALSE),
       '#default_value' => variable_get('plus_search_menu_name', 'menu-search-menu'),
       '#description' => t('Select a menu to be used for alternative search options (if enabled)'),
   );
    $form = system_settings_form($form);
    // dpm($form);
    return $form;
}