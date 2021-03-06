module.exports = {
  bind: function (app, assetPath) {
    app.get('/', function (req, res) {
      res.render('fic/index', { 'asset_path': assetPath })
    })
    
    // Redirect snippets page to the index page
    app.get('/snippets', function (req, res) {
      res.redirect('/')
    })
    
    // Layout
    app.get('/layout', function (req, res) {
      var pageName = 'Layout'
      res.render('guide_layout', { 'page_name': pageName })
    })
    
    // Example page: Grid layout
    app.get('/layout/example-grid-layout', function (req, res) {
      var section = 'layout'
      var sectionName = 'Layout'
      var pageName = 'Example: Grid layout'
      res.render('examples/example_grid_layout', { 'section': section, 'section_name': sectionName, 'page_name': pageName })
    })
    
    // Redirect examples from /examples/ to /section/example-name-of-example
    app.get('/examples/grid-layout', function (req, res) {
      res.redirect('/layout/example-grid-layout')
    })
    
    // Typography
    app.get('/typography', function (req, res) {
      var pageName = 'Typography'
      res.render('guide_typography', { 'page_name': pageName })
    })
    
    // Example page: Typography
    app.get('/typography/example-typography', function (req, res) {
      var section = 'typography'
      var sectionName = 'Typography'
      var pageName = 'Example: Typography'
      res.render('examples/example_typography', { 'section': section, 'section_name': sectionName, 'page_name': pageName })
    })
    
    // Redirect examples from /examples/ to /section/example-name-of-example
    app.get('/examples/typography', function (req, res) {
      res.redirect('/typography/example-typography')
    })
    
    // Example page: Progressive disclosure
    app.get('/typography/example-details-summary', function (req, res) {
      var section = 'typography'
      var sectionName = 'Typography'
      var pageName = 'Example: Details summary'
      res.render('examples/example_details_summary', { 'section': section, 'section_name': sectionName, 'page_name': pageName })
    })
    
    // Redirect examples from /patterns/ to /section/example-name-of-example
    app.get('/patterns/details-summary', function (req, res) {
      res.redirect('/typography/example-details-summary')
    })
    
    // Colour
    app.get('/colour', function (req, res) {
      var pageName = 'Colour'
      res.render('guide_colour', { 'page_name': pageName })
    })
    
    // Icons and images
    app.get('/icons-images', function (req, res) {
      var pageName = 'Icons and images'
      res.render('guide_icons_images', { 'page_name': pageName })
    })
    
    // Example page: Icons
    app.get('/icons-images/example-icons', function (req, res) {
      var section = 'icons-images'
      var sectionName = 'Icons and images'
      var pageName = 'Example: Icons'
      res.render('examples/example_icons', { 'section': section, 'section_name': sectionName, 'page_name': pageName })
    })
    
    // Data
    app.get('/data', function (req, res) {
      var pageName = 'Data'
      res.render('guide_data', { 'page_name': pageName })
    })
    
    // Buttons
    app.get('/buttons', function (req, res) {
      var pageName = 'Buttons'
      res.render('guide_buttons', { 'page_name': pageName })
    })
    
    // Buttons
    app.get('/empty', function (req, res) {
      var pageName = 'Empty'
      res.render('guide_empty', { 'page_name': pageName })
    })
    
    // Forms
    app.get('/form-elements', function (req, res) {
      var pageName = 'Form elements'
      res.render('guide_form_elements', { 'page_name': pageName })
    })
    
    // Example page: Basic form
    app.get('/form-elements/example-forms', function (req, res) {
      var section = 'form-elements'
      var sectionName = 'Form elements'
      var pageName = 'Example: Form'
      res.render('examples/example_forms', { 'section': section, 'section_name': sectionName, 'page_name': pageName })
    })
    
    // Redirect examples from /examples/ to /section/example-name-of-example
    app.get('/examples/forms', function (req, res) {
      res.redirect('/form-elements/example-forms')
    })
    
    // Example page: Date pattern
    app.get('/form-elements/example-date', function (req, res) {
      var section = 'form-elements'
      var sectionName = 'Form elements'
      var pageName = 'Example: Date'
      res.render('examples/example_date', { 'section': section, 'section_name': sectionName, 'page_name': pageName })
    })
    
    // Redirect examples from /patterns/ to /section/example-name-of-example
    app.get('/patterns/date', function (req, res) {
      res.redirect('/form-elements/example-date')
    })
    
    // Example page: Radio buttons and checkboxes
    app.get('/form-elements/example-radios-checkboxes', function (req, res) {
      var section = 'form-elements'
      var sectionName = 'Form elements'
      var pageName = 'Example: Radio buttons and checkboxes'
      res.render('examples/example_radios_checkboxes', { 'section': section, 'section_name': sectionName, 'page_name': pageName })
    })
    
    // Redirect examples from /patterns/ to /section/example-name-of-example
    app.get('/patterns/radios-checkboxes', function (req, res) {
      res.redirect('/form-elements/example-radios-checkboxes')
    })
    
    // Example page: Form elements
    app.get('/form-elements/example-form-elements', function (req, res) {
      var section = 'form-elements'
      var sectionName = 'Form elements'
      var pageName = 'Example: Form elements'
      res.render('examples/example_form_elements', { 'section': section, 'section_name': sectionName, 'page_name': pageName })
    })
    
    // Errors and validation
    app.get('/errors', function (req, res) {
      var pageName = 'Errors and validation'
      res.render('guide_errors', { 'page_name': pageName })
    })
    
    // Example page: Form validation
    app.get('/errors/example-form-validation-single-question-radio', function (req, res) {
      var section = 'errors'
      var sectionName = 'Errors and validation'
      var pageName = 'Example: Form validation - single question'
      res.render('examples/example_form_validation_single_question_radio', { 'section': section, 'section_name': sectionName, 'page_name': pageName })
    })
    
    app.post('/errors/example-form-validation-single-question-radio', function (req, res) {
      var section = 'errors'
      var sectionName = 'Errors and validation'
      var pageName = 'Example: Form validation - single question'
      var personalDetails = req.body.personalDetails
      var error = false
      if (!personalDetails) {
        error = true
      } else {
        error = false
      }
      res.render('examples/example_form_validation_single_question_radio', { 'section': section, 'section_name': sectionName, 'page_name': pageName, 'personal_details': personalDetails, 'error': error })
    })
    
    // Redirect examples from /examples/ to /section/example-name-of-example
    app.get('/examples/form-validation-single-question-radio', function (req, res) {
      res.redirect('/errors/example-form-validation-single-question-radio')
    })
    
    app.get('/errors/example-form-validation-multiple-questions', function (req, res) {
      var section = 'errors'
      var sectionName = 'Errors and validation'
      var pageName = 'Example: Form validation - multiple questions'
      res.render('examples/example_form_validation_multiple_questions', { 'section': section, 'section_name': sectionName, 'page_name': pageName })
    })
    
    app.post('/errors/example-form-validation-multiple-questions', function (req, res) {
      var section = 'errors'
      var sectionName = 'Errors and validation'
      var pageName = 'Example: Form validation - multiple questions'
      var fullName = req.body.fullName
      var niNo = req.body.niNo
      var error = false
      if (!fullName || !niNo) {
        error = true
      } else {
        error = false
      }
      res.render('examples/example_form_validation_multiple_questions', { 'section': section, 'section_name': sectionName, 'page_name': pageName, 'fullName': fullName, 'niNo': niNo, 'error': error })
    })
    
    // Redirect examples from /examples/ to /section/example-name-of-example
    app.get('/examples/form-validation-multiple-questions', function (req, res) {
      res.redirect('/errors/example-form-validation-multiple-questions')
    })
    
    // Alpha and beta banners
    app.get('/alpha-beta-banners', function (req, res) {
      var pageName = 'Alpha and beta banners'
      res.render('guide_alpha_beta', { 'page_name': pageName })
    })
    
    app.get('/tabs', function (req, res) {
      var pageName = 'Tabs'
      res.render('guide_tabs', { 'page_name': pageName })
    })
    
    // FIC
    app.get('/fic', function (req, res) {
      var pageName = 'FIC'
      res.render('fic/index', { 'page_name': pageName })
    })
    
    app.get('/fic/start', function (req, res) {
      var pageName = 'FIC'
      res.render('fic/start', { 'page_name': pageName })
    })
    
    app.get('/fic/adjusted-summary', function (req, res) {
      var pageName = 'FIC'
      res.render('fic/adjusted-summary', { 'page_name': pageName })
    })
    
    app.get('/fic/adjusted-thank-you', function (req, res) {
      var pageName = 'FIC'
      res.render('fic/adjusted-thank-you', { 'page_name': pageName })
    })
    
    app.get('/fic/already-paid', function (req, res) {
      var pageName = 'FIC'
      res.render('fic/already-paid', { 'page_name': pageName })
    })
    
    app.get('/fic/coming-soon', function (req, res) {
      var pageName = 'FIC'
      res.render('fic/coming-soon', { 'page_name': pageName })
    })
    
    app.get('/fic/contributions-and-payment', function (req, res) {
      var pageName = 'FIC'
      res.render('fic/contributions-and-payment', { 'page_name': pageName })
    })
    
    app.get('/fic/forgot-password-reset', function (req, res) {
      var pageName = 'FIC'
      res.render('fic/forgot-password-reset', { 'page_name': pageName })
    })
    
    app.get('/fic/forgot-password', function (req, res) {
      var pageName = 'FIC'
      res.render('fic/forgot-password', { 'page_name': pageName })
    })
    
    app.get('/fic/login', function (req, res) {
      var pageName = 'FIC'
      res.render('fic/login', { 'page_name': pageName })
    })

    app.get('/fic/financial-information-collection', function (req, res) {
      var pageName = 'FIC'
      res.render('fic/financial-information-collection', { 'page_name': pageName })
    })
    
    app.get('/fic/make-payment', function (req, res) {
      var pageName = 'FIC'
      res.render('fic/make-payment', { 'page_name': pageName })
    })
    
    app.get('/fic/multi-ea', function (req, res) {
      var pageName = 'FIC'
      res.render('fic/multi-ea', { 'page_name': pageName })
    })
    
    app.get('/fic/new-password', function (req, res) {
      var pageName = 'FIC'
      res.render('fic/new-password', { 'page_name': pageName })
    })
    
    app.get('/fic/new-password-email', function (req, res) {
      var pageName = 'FIC'
      res.render('fic/new-password-email', { 'page_name': pageName })
    })
    
    app.get('/fic/not-found', function (req, res) {
      var pageName = 'FIC'
      res.render('fic/not-found', { 'page_name': pageName })
    })
    
    app.get('/fic/password-saved', function (req, res) {
      var pageName = 'FIC'
      res.render('fic/password-saved', { 'page_name': pageName })
    })
    
    app.get('/fic/permission-denied', function (req, res) {
      var pageName = 'FIC'
      res.render('fic/permission-denied', { 'page_name': pageName })
    })
    
    app.get('/fic/previous-payments', function (req, res) {
      var pageName = 'FIC'
      res.render('fic/previous-payments', { 'page_name': pageName })
    })
    
    app.get('/fic/searched-ea', function (req, res) {
      var pageName = 'FIC'
      res.render('fic/searched-ea', { 'page_name': pageName })
    })
    
    app.get('/fic/select-ea', function (req, res) {
      var pageName = 'FIC'
      res.render('fic/select-ea', { 'page_name': pageName })
    })
    
    app.get('/fic/session-ended', function (req, res) {
      var pageName = 'FIC'
      res.render('fic/session-ended', { 'page_name': pageName })
    })
    
    app.get('/fic/summary', function (req, res) {
      var pageName = 'FIC'
      res.render('fic/summary', { 'page_name': pageName })
    })
    
    app.get('/fic/thank-you', function (req, res) {
      var pageName = 'FIC'
      res.render('fic/thank-you', { 'page_name': pageName })
    })
    
    app.get('/fic/thank-you2', function (req, res) {
      var pageName = 'FIC'
      res.render('fic/thank-you2', { 'page_name': pageName })
    })
    
    app.get('/fic/unavailable', function (req, res) {
      var pageName = 'FIC'
      res.render('fic/unavailable', { 'page_name': pageName })
    })
    
    app.get('/fic/updated', function (req, res) {
      var pageName = 'FIC'
      res.render('fic/updated', { 'page_name': pageName })
    })
    
    app.get('/fic/admin-employer-create', function (req, res) {
      var pageName = 'FIC'
      res.render('fic/admin-employer-create', { 'page_name': pageName })
    })
    
    app.get('/fic/admin-employer-created', function (req, res) {
      var pageName = 'FIC'
      res.render('fic/admin-employer-created', { 'page_name': pageName })
    })
    
    app.get('/fic/standard-employer-create', function (req, res) {
      var pageName = 'FIC'
      res.render('fic/standard-employer-create', { 'page_name': pageName })
    })
    
    app.get('/fic/standard-employer-created', function (req, res) {
      var pageName = 'FIC'
      res.render('fic/standard-employer-created', { 'page_name': pageName })
    })
    
    // app.get('/fic/saved-contributions', function (req, res) {
    //   var pageName = 'FIC'
    //   res.render('fic/saved-contributions', { 'page_name': pageName })
    // })
    
    app.get('/fic/administrate/employer-admin', function (req, res) {
      var pageName = 'FIC'
      res.render('fic/administrate/employer-admin', { 'page_name': pageName })
    })
    
    app.get('/fic/administrate/admin-login', function (req, res) {
      var pageName = 'FIC'
      res.render('fic/administrate/admin-login', { 'page_name': pageName })
    })
    
    app.get('/fic/administrate/accounts', function (req, res) {
      var pageName = 'FIC'
      res.render('fic/administrate/accounts', { 'page_name': pageName })
    })
    
    app.get('/fic/administrate/confirm-delete', function (req, res) {
      var pageName = 'FIC'
      res.render('fic/administrate/confirm-delete', { 'page_name': pageName })
    })
    
    app.get('/fic/administrate/delete-done', function (req, res) {
      var pageName = 'FIC'
      res.render('fic/administrate/delete-done', { 'page_name': pageName })
    })
    
    app.get('/fic/administrate/change-account', function (req, res) {
      var pageName = 'FIC'
      res.render('fic/administrate/change-account', { 'page_name': pageName })
    })
    
    app.get('/fic/administrate/add-account', function (req, res) {
      var pageName = 'FIC'
      res.render('fic/administrate/add-account', { 'page_name': pageName })
    })
    
    app.get('/fic/administrate/add-done', function (req, res) {
      var pageName = 'FIC'
      res.render('fic/administrate/add-done', { 'page_name': pageName })
    })
    
    app.get('/fic/google-form/pension-enquiry-service-intro', function (req, res) {
      var pageName = 'FIC'
      res.render('fic/google-form/pension-enquiry-service-intro', { 'page_name': pageName })
    })
    
    app.get('/fic/google-form/pension-enquiry-service', function (req, res) {
      var pageName = 'FIC'
      res.render('fic/google-form/pension-enquiry-service', { 'page_name': pageName })
    })

    app.get('/fic/500-server-error', function (req, res) {
      var pageName = 'FIC'
      res.render('fic/500-server-error', { 'page_name': pageName })
    })

    app.get('/fic/ea', function (req, res) {
      var pageName = 'Blackpool emplying authority EA1000'
      res.render('fic/ea', { 'page_name': pageName })
    })

    app.get('/fic/find-ea', function (req, res) {
      var pageName = 'Find an EA'
      res.render('fic/find-ea', { 'page_name': pageName })
    })

    app.get('/fic/history', function (req, res) {
      var pageName = 'Pension contribution payment history'
      res.render('fic/history', { 'page_name': pageName })
    })

    app.get('/fic/change-password', function (req, res) {
      var pageName = 'Change your password'
      res.render('fic/change-password', { 'page_name': pageName })
    })

    app.post('/fic/password-changed', function (req, res) {
      var pageName = 'Password successfully changed'
      res.render('fic/password-changed', { 'page_name': pageName })
    })

    app.get('/fic/locked-out', function (req, res) {
      var pageName = 'Locked out'
      res.render('fic/locked-out', { 'page_name': pageName })
    })

  }
}
