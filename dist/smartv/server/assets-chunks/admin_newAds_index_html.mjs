export default `<!DOCTYPE html><html lang="en" data-beasties-container><head>
  <meta charset="utf-8">
  <title>Smartv</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <base href="/">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet">

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
<style>@charset "UTF-8";:root{--bs-blue:#0d6efd;--bs-indigo:#6610f2;--bs-purple:#6f42c1;--bs-pink:#d63384;--bs-red:#dc3545;--bs-orange:#fd7e14;--bs-yellow:#ffc107;--bs-green:#198754;--bs-teal:#20c997;--bs-cyan:#0dcaf0;--bs-black:#000;--bs-white:#fff;--bs-gray:#6c757d;--bs-gray-dark:#343a40;--bs-gray-100:#f8f9fa;--bs-gray-200:#e9ecef;--bs-gray-300:#dee2e6;--bs-gray-400:#ced4da;--bs-gray-500:#adb5bd;--bs-gray-600:#6c757d;--bs-gray-700:#495057;--bs-gray-800:#343a40;--bs-gray-900:#212529;--bs-primary:#0d6efd;--bs-secondary:#6c757d;--bs-success:#198754;--bs-info:#0dcaf0;--bs-warning:#ffc107;--bs-danger:#dc3545;--bs-light:#f8f9fa;--bs-dark:#212529;--bs-primary-rgb:13,110,253;--bs-secondary-rgb:108,117,125;--bs-success-rgb:25,135,84;--bs-info-rgb:13,202,240;--bs-warning-rgb:255,193,7;--bs-danger-rgb:220,53,69;--bs-light-rgb:248,249,250;--bs-dark-rgb:33,37,41;--bs-primary-text-emphasis:#052c65;--bs-secondary-text-emphasis:#2b2f32;--bs-success-text-emphasis:#0a3622;--bs-info-text-emphasis:#055160;--bs-warning-text-emphasis:#664d03;--bs-danger-text-emphasis:#58151c;--bs-light-text-emphasis:#495057;--bs-dark-text-emphasis:#495057;--bs-primary-bg-subtle:#cfe2ff;--bs-secondary-bg-subtle:#e2e3e5;--bs-success-bg-subtle:#d1e7dd;--bs-info-bg-subtle:#cff4fc;--bs-warning-bg-subtle:#fff3cd;--bs-danger-bg-subtle:#f8d7da;--bs-light-bg-subtle:#fcfcfd;--bs-dark-bg-subtle:#ced4da;--bs-primary-border-subtle:#9ec5fe;--bs-secondary-border-subtle:#c4c8cb;--bs-success-border-subtle:#a3cfbb;--bs-info-border-subtle:#9eeaf9;--bs-warning-border-subtle:#ffe69c;--bs-danger-border-subtle:#f1aeb5;--bs-light-border-subtle:#e9ecef;--bs-dark-border-subtle:#adb5bd;--bs-white-rgb:255,255,255;--bs-black-rgb:0,0,0;--bs-font-sans-serif:system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans","Liberation Sans",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";--bs-font-monospace:SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;--bs-gradient:linear-gradient(180deg, rgba(255, 255, 255, .15), rgba(255, 255, 255, 0));--bs-body-font-family:var(--bs-font-sans-serif);--bs-body-font-size:1rem;--bs-body-font-weight:400;--bs-body-line-height:1.5;--bs-body-color:#212529;--bs-body-color-rgb:33,37,41;--bs-body-bg:#fff;--bs-body-bg-rgb:255,255,255;--bs-emphasis-color:#000;--bs-emphasis-color-rgb:0,0,0;--bs-secondary-color:rgba(33, 37, 41, .75);--bs-secondary-color-rgb:33,37,41;--bs-secondary-bg:#e9ecef;--bs-secondary-bg-rgb:233,236,239;--bs-tertiary-color:rgba(33, 37, 41, .5);--bs-tertiary-color-rgb:33,37,41;--bs-tertiary-bg:#f8f9fa;--bs-tertiary-bg-rgb:248,249,250;--bs-heading-color:inherit;--bs-link-color:#0d6efd;--bs-link-color-rgb:13,110,253;--bs-link-decoration:underline;--bs-link-hover-color:#0a58ca;--bs-link-hover-color-rgb:10,88,202;--bs-code-color:#d63384;--bs-highlight-color:#212529;--bs-highlight-bg:#fff3cd;--bs-border-width:1px;--bs-border-style:solid;--bs-border-color:#dee2e6;--bs-border-color-translucent:rgba(0, 0, 0, .175);--bs-border-radius:.375rem;--bs-border-radius-sm:.25rem;--bs-border-radius-lg:.5rem;--bs-border-radius-xl:1rem;--bs-border-radius-xxl:2rem;--bs-border-radius-2xl:var(--bs-border-radius-xxl);--bs-border-radius-pill:50rem;--bs-box-shadow:0 .5rem 1rem rgba(0, 0, 0, .15);--bs-box-shadow-sm:0 .125rem .25rem rgba(0, 0, 0, .075);--bs-box-shadow-lg:0 1rem 3rem rgba(0, 0, 0, .175);--bs-box-shadow-inset:inset 0 1px 2px rgba(0, 0, 0, .075);--bs-focus-ring-width:.25rem;--bs-focus-ring-opacity:.25;--bs-focus-ring-color:rgba(13, 110, 253, .25);--bs-form-valid-color:#198754;--bs-form-valid-border-color:#198754;--bs-form-invalid-color:#dc3545;--bs-form-invalid-border-color:#dc3545}*,:after,:before{box-sizing:border-box}@media (prefers-reduced-motion:no-preference){:root{scroll-behavior:smooth}}body{margin:0;font-family:var(--bs-body-font-family);font-size:var(--bs-body-font-size);font-weight:var(--bs-body-font-weight);line-height:var(--bs-body-line-height);color:var(--bs-body-color);text-align:var(--bs-body-text-align);background-color:var(--bs-body-bg);-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:transparent}h2{margin-top:0;margin-bottom:.5rem;font-weight:500;line-height:1.2;color:var(--bs-heading-color)}h2{font-size:calc(1.325rem + .9vw)}@media (min-width:1200px){h2{font-size:2rem}}ul{padding-left:2rem}ul{margin-top:0;margin-bottom:1rem}ul ul{margin-bottom:0}small{font-size:.875em}a{color:rgba(var(--bs-link-color-rgb),var(--bs-link-opacity,1));text-decoration:underline}a:hover{--bs-link-color-rgb:var(--bs-link-hover-color-rgb)}img{vertical-align:middle}label{display:inline-block}button{border-radius:0}button:focus:not(:focus-visible){outline:0}button,input,select,textarea{margin:0;font-family:inherit;font-size:inherit;line-height:inherit}button,select{text-transform:none}[role=button]{cursor:pointer}select{word-wrap:normal}select:disabled{opacity:1}[type=button],[type=submit],button{-webkit-appearance:button}[type=button]:not(:disabled),[type=submit]:not(:disabled),button:not(:disabled){cursor:pointer}textarea{resize:vertical}.container{--bs-gutter-x:1.5rem;--bs-gutter-y:0;width:100%;padding-right:calc(var(--bs-gutter-x) * .5);padding-left:calc(var(--bs-gutter-x) * .5);margin-right:auto;margin-left:auto}@media (min-width:576px){.container{max-width:540px}}@media (min-width:768px){.container{max-width:720px}}@media (min-width:992px){.container{max-width:960px}}@media (min-width:1200px){.container{max-width:1140px}}@media (min-width:1400px){.container{max-width:1320px}}:root{--bs-breakpoint-xs:0;--bs-breakpoint-sm:576px;--bs-breakpoint-md:768px;--bs-breakpoint-lg:992px;--bs-breakpoint-xl:1200px;--bs-breakpoint-xxl:1400px}.form-text{margin-top:.25rem;font-size:.875em;color:var(--bs-secondary-color)}.form-control{display:block;width:100%;padding:.375rem .75rem;font-size:1rem;font-weight:400;line-height:1.5;color:var(--bs-body-color);-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:var(--bs-body-bg);background-clip:padding-box;border:var(--bs-border-width) solid var(--bs-border-color);border-radius:var(--bs-border-radius);transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out}@media (prefers-reduced-motion:reduce){.form-control{transition:none}}.form-control:focus{color:var(--bs-body-color);background-color:var(--bs-body-bg);border-color:#86b7fe;outline:0;box-shadow:0 0 0 .25rem #0d6efd40}.form-control::-webkit-date-and-time-value{min-width:85px;height:1.5em;margin:0}.form-control::-webkit-datetime-edit{display:block;padding:0}.form-control::-moz-placeholder{color:var(--bs-secondary-color);opacity:1}.form-control::placeholder{color:var(--bs-secondary-color);opacity:1}.form-control:disabled{background-color:var(--bs-secondary-bg);opacity:1}.form-control::-webkit-file-upload-button{padding:.375rem .75rem;margin:-.375rem -.75rem;-webkit-margin-end:.75rem;margin-inline-end:.75rem;color:var(--bs-body-color);background-color:var(--bs-tertiary-bg);pointer-events:none;border-color:inherit;border-style:solid;border-width:0;border-inline-end-width:var(--bs-border-width);border-radius:0;-webkit-transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out}.form-control::file-selector-button{padding:.375rem .75rem;margin:-.375rem -.75rem;-webkit-margin-end:.75rem;margin-inline-end:.75rem;color:var(--bs-body-color);background-color:var(--bs-tertiary-bg);pointer-events:none;border-color:inherit;border-style:solid;border-width:0;border-inline-end-width:var(--bs-border-width);border-radius:0;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out}@media (prefers-reduced-motion:reduce){.form-control::-webkit-file-upload-button{-webkit-transition:none;transition:none}.form-control::file-selector-button{transition:none}}.form-control:hover:not(:disabled):not([readonly])::-webkit-file-upload-button{background-color:var(--bs-secondary-bg)}.form-control:hover:not(:disabled):not([readonly])::file-selector-button{background-color:var(--bs-secondary-bg)}textarea.form-control{min-height:calc(1.5em + .75rem + calc(var(--bs-border-width) * 2))}.btn{--bs-btn-padding-x:.75rem;--bs-btn-padding-y:.375rem;--bs-btn-font-family: ;--bs-btn-font-size:1rem;--bs-btn-font-weight:400;--bs-btn-line-height:1.5;--bs-btn-color:var(--bs-body-color);--bs-btn-bg:transparent;--bs-btn-border-width:var(--bs-border-width);--bs-btn-border-color:transparent;--bs-btn-border-radius:var(--bs-border-radius);--bs-btn-hover-border-color:transparent;--bs-btn-box-shadow:inset 0 1px 0 rgba(255, 255, 255, .15),0 1px 1px rgba(0, 0, 0, .075);--bs-btn-disabled-opacity:.65;--bs-btn-focus-box-shadow:0 0 0 .25rem rgba(var(--bs-btn-focus-shadow-rgb), .5);display:inline-block;padding:var(--bs-btn-padding-y) var(--bs-btn-padding-x);font-family:var(--bs-btn-font-family);font-size:var(--bs-btn-font-size);font-weight:var(--bs-btn-font-weight);line-height:var(--bs-btn-line-height);color:var(--bs-btn-color);text-align:center;text-decoration:none;vertical-align:middle;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;user-select:none;border:var(--bs-btn-border-width) solid var(--bs-btn-border-color);border-radius:var(--bs-btn-border-radius);background-color:var(--bs-btn-bg);transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out}@media (prefers-reduced-motion:reduce){.btn{transition:none}}.btn:hover{color:var(--bs-btn-hover-color);background-color:var(--bs-btn-hover-bg);border-color:var(--bs-btn-hover-border-color)}.btn:focus-visible{color:var(--bs-btn-hover-color);background-color:var(--bs-btn-hover-bg);border-color:var(--bs-btn-hover-border-color);outline:0;box-shadow:var(--bs-btn-focus-box-shadow)}.btn:first-child:active{color:var(--bs-btn-active-color);background-color:var(--bs-btn-active-bg);border-color:var(--bs-btn-active-border-color)}.btn:first-child:active:focus-visible{box-shadow:var(--bs-btn-focus-box-shadow)}.btn:disabled{color:var(--bs-btn-disabled-color);pointer-events:none;background-color:var(--bs-btn-disabled-bg);border-color:var(--bs-btn-disabled-border-color);opacity:var(--bs-btn-disabled-opacity)}.collapse:not(.show){display:none}.dropdown{position:relative}.dropdown-toggle{white-space:nowrap}.dropdown-toggle:after{display:inline-block;margin-left:.255em;vertical-align:.255em;content:"";border-top:.3em solid;border-right:.3em solid transparent;border-bottom:0;border-left:.3em solid transparent}.dropdown-toggle:empty:after{margin-left:0}.dropdown-menu{--bs-dropdown-zindex:1000;--bs-dropdown-min-width:10rem;--bs-dropdown-padding-x:0;--bs-dropdown-padding-y:.5rem;--bs-dropdown-spacer:.125rem;--bs-dropdown-font-size:1rem;--bs-dropdown-color:var(--bs-body-color);--bs-dropdown-bg:var(--bs-body-bg);--bs-dropdown-border-color:var(--bs-border-color-translucent);--bs-dropdown-border-radius:var(--bs-border-radius);--bs-dropdown-border-width:var(--bs-border-width);--bs-dropdown-inner-border-radius:calc(var(--bs-border-radius) - var(--bs-border-width));--bs-dropdown-divider-bg:var(--bs-border-color-translucent);--bs-dropdown-divider-margin-y:.5rem;--bs-dropdown-box-shadow:var(--bs-box-shadow);--bs-dropdown-link-color:var(--bs-body-color);--bs-dropdown-link-hover-color:var(--bs-body-color);--bs-dropdown-link-hover-bg:var(--bs-tertiary-bg);--bs-dropdown-link-active-color:#fff;--bs-dropdown-link-active-bg:#0d6efd;--bs-dropdown-link-disabled-color:var(--bs-tertiary-color);--bs-dropdown-item-padding-x:1rem;--bs-dropdown-item-padding-y:.25rem;--bs-dropdown-header-color:#6c757d;--bs-dropdown-header-padding-x:1rem;--bs-dropdown-header-padding-y:.5rem;position:absolute;z-index:var(--bs-dropdown-zindex);display:none;min-width:var(--bs-dropdown-min-width);padding:var(--bs-dropdown-padding-y) var(--bs-dropdown-padding-x);margin:0;font-size:var(--bs-dropdown-font-size);color:var(--bs-dropdown-color);text-align:left;list-style:none;background-color:var(--bs-dropdown-bg);background-clip:padding-box;border:var(--bs-dropdown-border-width) solid var(--bs-dropdown-border-color);border-radius:var(--bs-dropdown-border-radius)}.dropdown-item{display:block;width:100%;padding:var(--bs-dropdown-item-padding-y) var(--bs-dropdown-item-padding-x);clear:both;font-weight:400;color:var(--bs-dropdown-link-color);text-align:inherit;text-decoration:none;white-space:nowrap;background-color:transparent;border:0;border-radius:var(--bs-dropdown-item-border-radius,0)}.dropdown-item:focus,.dropdown-item:hover{color:var(--bs-dropdown-link-hover-color);background-color:var(--bs-dropdown-link-hover-bg)}.dropdown-item:active{color:var(--bs-dropdown-link-active-color);text-decoration:none;background-color:var(--bs-dropdown-link-active-bg)}.dropdown-item:disabled{color:var(--bs-dropdown-link-disabled-color);pointer-events:none;background-color:transparent}.nav-link{display:block;padding:var(--bs-nav-link-padding-y) var(--bs-nav-link-padding-x);font-size:var(--bs-nav-link-font-size);font-weight:var(--bs-nav-link-font-weight);color:var(--bs-nav-link-color);text-decoration:none;background:0 0;border:0;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out}@media (prefers-reduced-motion:reduce){.nav-link{transition:none}}.nav-link:focus,.nav-link:hover{color:var(--bs-nav-link-hover-color)}.nav-link:focus-visible{outline:0;box-shadow:0 0 0 .25rem #0d6efd40}.nav-link:disabled{color:var(--bs-nav-link-disabled-color);pointer-events:none;cursor:default}.navbar{--bs-navbar-padding-x:0;--bs-navbar-padding-y:.5rem;--bs-navbar-color:rgba(var(--bs-emphasis-color-rgb), .65);--bs-navbar-hover-color:rgba(var(--bs-emphasis-color-rgb), .8);--bs-navbar-disabled-color:rgba(var(--bs-emphasis-color-rgb), .3);--bs-navbar-active-color:rgba(var(--bs-emphasis-color-rgb), 1);--bs-navbar-brand-padding-y:.3125rem;--bs-navbar-brand-margin-end:1rem;--bs-navbar-brand-font-size:1.25rem;--bs-navbar-brand-color:rgba(var(--bs-emphasis-color-rgb), 1);--bs-navbar-brand-hover-color:rgba(var(--bs-emphasis-color-rgb), 1);--bs-navbar-nav-link-padding-x:.5rem;--bs-navbar-toggler-padding-y:.25rem;--bs-navbar-toggler-padding-x:.75rem;--bs-navbar-toggler-font-size:1.25rem;--bs-navbar-toggler-icon-bg:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%2833, 37, 41, 0.75%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");--bs-navbar-toggler-border-color:rgba(var(--bs-emphasis-color-rgb), .15);--bs-navbar-toggler-border-radius:var(--bs-border-radius);--bs-navbar-toggler-focus-width:.25rem;--bs-navbar-toggler-transition:box-shadow .15s ease-in-out;position:relative;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;padding:var(--bs-navbar-padding-y) var(--bs-navbar-padding-x)}.navbar>.container{display:flex;flex-wrap:inherit;align-items:center;justify-content:space-between}.navbar-brand{padding-top:var(--bs-navbar-brand-padding-y);padding-bottom:var(--bs-navbar-brand-padding-y);margin-right:var(--bs-navbar-brand-margin-end);font-size:var(--bs-navbar-brand-font-size);color:var(--bs-navbar-brand-color);text-decoration:none;white-space:nowrap}.navbar-brand:focus,.navbar-brand:hover{color:var(--bs-navbar-brand-hover-color)}.navbar-nav{--bs-nav-link-padding-x:0;--bs-nav-link-padding-y:.5rem;--bs-nav-link-font-weight: ;--bs-nav-link-color:var(--bs-navbar-color);--bs-nav-link-hover-color:var(--bs-navbar-hover-color);--bs-nav-link-disabled-color:var(--bs-navbar-disabled-color);display:flex;flex-direction:column;padding-left:0;margin-bottom:0;list-style:none}.navbar-nav .dropdown-menu{position:static}.navbar-collapse{flex-basis:100%;flex-grow:1;align-items:center}.navbar-toggler{padding:var(--bs-navbar-toggler-padding-y) var(--bs-navbar-toggler-padding-x);font-size:var(--bs-navbar-toggler-font-size);line-height:1;color:var(--bs-navbar-color);background-color:transparent;border:var(--bs-border-width) solid var(--bs-navbar-toggler-border-color);border-radius:var(--bs-navbar-toggler-border-radius);transition:var(--bs-navbar-toggler-transition)}@media (prefers-reduced-motion:reduce){.navbar-toggler{transition:none}}.navbar-toggler:hover{text-decoration:none}.navbar-toggler:focus{text-decoration:none;outline:0;box-shadow:0 0 0 var(--bs-navbar-toggler-focus-width)}.navbar-toggler-icon{display:inline-block;width:1.5em;height:1.5em;vertical-align:middle;background-image:var(--bs-navbar-toggler-icon-bg);background-repeat:no-repeat;background-position:center;background-size:100%}@media (min-width:992px){.navbar-expand-lg{flex-wrap:nowrap;justify-content:flex-start}.navbar-expand-lg .navbar-nav{flex-direction:row}.navbar-expand-lg .navbar-nav .dropdown-menu{position:absolute}.navbar-expand-lg .navbar-nav .nav-link{padding-right:var(--bs-navbar-nav-link-padding-x);padding-left:var(--bs-navbar-nav-link-padding-x)}.navbar-expand-lg .navbar-collapse{display:flex!important;flex-basis:auto}.navbar-expand-lg .navbar-toggler{display:none}}.navbar-dark{--bs-navbar-color:rgba(255, 255, 255, .55);--bs-navbar-hover-color:rgba(255, 255, 255, .75);--bs-navbar-disabled-color:rgba(255, 255, 255, .25);--bs-navbar-active-color:#fff;--bs-navbar-brand-color:#fff;--bs-navbar-brand-hover-color:#fff;--bs-navbar-toggler-border-color:rgba(255, 255, 255, .1);--bs-navbar-toggler-icon-bg:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.55%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e")}.sticky-top{position:-webkit-sticky;position:sticky;top:0;z-index:1020}.align-text-top{vertical-align:text-top!important}.d-inline-block{display:inline-block!important}.shadow-lg{box-shadow:var(--bs-box-shadow-lg)!important}.me-2{margin-right:.5rem!important}.mb-5{margin-bottom:3rem!important}.ms-3{margin-left:1rem!important}.ms-auto{margin-left:auto!important}.text-muted{--bs-text-opacity:1;color:var(--bs-secondary-color)!important}.bg-dark{--bs-bg-opacity:1;background-color:rgba(var(--bs-dark-rgb),var(--bs-bg-opacity))!important}
</style><link rel="stylesheet" href="styles-DZ6UBGXD.css" media="print" onload="this.media='all'"><noscript><link rel="stylesheet" href="styles-DZ6UBGXD.css"></noscript><style ng-app-id="ng">.navbar[_ngcontent-ng-c902998988]{background:linear-gradient(135deg,#1f1f1f,#2c2c2c);box-shadow:0 8px 15px #00000080;transition:all .3s ease-in-out}.navbar[_ngcontent-ng-c902998988]:hover{box-shadow:0 10px 20px #000000b3}.navbar-brand[_ngcontent-ng-c902998988]{display:flex;align-items:center;gap:.5rem;font-size:1.5rem;font-weight:700;text-transform:uppercase;color:#fff;transition:color .3s ease-in-out}.navbar-brand[_ngcontent-ng-c902998988]:hover{color:#00ffc3}.navbar-nav[_ngcontent-ng-c902998988]   .nav-link[_ngcontent-ng-c902998988]{position:relative;font-size:1rem;font-weight:500;color:#fff;display:flex;align-items:center;transition:all .3s ease}.navbar-nav[_ngcontent-ng-c902998988]   .nav-link[_ngcontent-ng-c902998988]   i[_ngcontent-ng-c902998988]{font-size:1.2rem;color:#00ffc3;transition:transform .3s ease-in-out}.navbar-nav[_ngcontent-ng-c902998988]   .nav-link[_ngcontent-ng-c902998988]:hover{color:#00ffc3;text-shadow:0px 4px 6px rgba(0,255,195,.6)}.navbar-nav[_ngcontent-ng-c902998988]   .nav-link[_ngcontent-ng-c902998988]:hover   i[_ngcontent-ng-c902998988]{transform:scale(1.2)}.btn-glow[_ngcontent-ng-c902998988]{background-color:#dc3545;color:#fff;border:none;padding:10px 15px;border-radius:50px;font-size:1rem;font-weight:700;text-transform:uppercase;box-shadow:0 8px 15px #dc354566;transition:all .3s ease-in-out;display:flex;align-items:center}.btn-glow[_ngcontent-ng-c902998988]   i[_ngcontent-ng-c902998988]{font-size:1.2rem}.btn-glow[_ngcontent-ng-c902998988]:hover{background-color:tomato;color:#fff;box-shadow:0 10px 20px #ff634799;transform:scale(1.1)}.btn-glow[_ngcontent-ng-c902998988]:hover   i[_ngcontent-ng-c902998988]{transform:rotate(360deg)}@media (max-width: 768px){.navbar-nav[_ngcontent-ng-c902998988]   .nav-item[_ngcontent-ng-c902998988]{margin-bottom:10px}.navbar-nav[_ngcontent-ng-c902998988]   .nav-link[_ngcontent-ng-c902998988]{text-align:center;font-size:1.1rem}.btn-glow[_ngcontent-ng-c902998988]{width:100%}}.active-link[_ngcontent-ng-c902998988]{color:#00ffc3!important;text-shadow:0px 4px 6px rgba(0,255,195,.6);font-weight:700;position:relative}.active-link[_ngcontent-ng-c902998988]:after{content:"";position:absolute;bottom:-4px;left:0;width:100%;height:2px;background:#00ffc3;border-radius:5px}.navbar-nav[_ngcontent-ng-c902998988]   .dropdown-menu[_ngcontent-ng-c902998988]{background:linear-gradient(135deg,#2a2a2a,#333);border:none;border-radius:.5rem;box-shadow:0 8px 15px #0006}.navbar-nav[_ngcontent-ng-c902998988]   .dropdown-item[_ngcontent-ng-c902998988]{color:#fff;font-size:.9rem;transition:background-color .3s ease}.navbar-nav[_ngcontent-ng-c902998988]   .dropdown-item[_ngcontent-ng-c902998988]:hover{background-color:#444;color:#00ffc3}</style><style ng-app-id="ng">.form-container[_ngcontent-ng-c1879075166]{display:flex;justify-content:center;align-items:center;min-height:100vh;padding:20px}.form-card[_ngcontent-ng-c1879075166]{background:#fff;border-radius:20px;box-shadow:0 10px 20px #0000001a;padding:40px 50px;width:100%;max-width:500px;animation:_ngcontent-ng-c1879075166_fadeIn .8s ease-in-out;text-align:center;transition:transform .3s ease,box-shadow .3s ease}.form-card[_ngcontent-ng-c1879075166]:hover{transform:translateY(-5px);box-shadow:0 15px 30px #00000026}.form-title[_ngcontent-ng-c1879075166]{font-size:2rem;font-weight:700;margin-bottom:25px;color:#333;text-shadow:0px 4px 8px rgba(0,0,0,.2)}.form-group[_ngcontent-ng-c1879075166]{margin-bottom:25px;text-align:left}.form-group[_ngcontent-ng-c1879075166]   label[_ngcontent-ng-c1879075166]{font-size:1rem;font-weight:700;margin-bottom:10px;color:#555}.form-group[_ngcontent-ng-c1879075166]   input[_ngcontent-ng-c1879075166], .form-group[_ngcontent-ng-c1879075166]   textarea[_ngcontent-ng-c1879075166], .form-group[_ngcontent-ng-c1879075166]   select[_ngcontent-ng-c1879075166]{width:100%;padding:12px 15px;border:2px solid #e0e0e0;border-radius:10px;font-size:1rem;transition:box-shadow .3s ease,border-color .3s ease;background:#f9f9f9}.form-group[_ngcontent-ng-c1879075166]   input[_ngcontent-ng-c1879075166]:focus, .form-group[_ngcontent-ng-c1879075166]   textarea[_ngcontent-ng-c1879075166]:focus, .form-group[_ngcontent-ng-c1879075166]   select[_ngcontent-ng-c1879075166]:focus{border-color:#007bff;box-shadow:0 5px 10px #007bff4d;outline:none;background:#fff}.btn-submit[_ngcontent-ng-c1879075166]{background:linear-gradient(135deg,#007bff,#0056b3);color:#fff;border:none;padding:12px 20px;border-radius:50px;font-size:1rem;font-weight:700;cursor:pointer;box-shadow:0 8px 15px #007bff66;transition:all .3s ease;display:inline-flex;align-items:center;justify-content:center;gap:10px}.btn-submit[_ngcontent-ng-c1879075166]:disabled{background:#ccc;color:#999;cursor:not-allowed;box-shadow:none}.btn-submit[_ngcontent-ng-c1879075166]:hover{background:linear-gradient(135deg,#0056b3,#003f7f);transform:translateY(-2px);box-shadow:0 12px 20px #0056b380}.btn-submit[_ngcontent-ng-c1879075166]:active{transform:translateY(2px);box-shadow:0 5px 10px #007bff4d}.spinner[_ngcontent-ng-c1879075166]{border:3px solid #f3f3f3;border-top:3px solid #007bff;border-radius:50%;width:18px;height:18px;animation:_ngcontent-ng-c1879075166_spin .8s linear infinite}.alert[_ngcontent-ng-c1879075166]{margin-bottom:20px;font-size:1rem;border-radius:10px;padding:10px 15px;text-align:center;animation:_ngcontent-ng-c1879075166_fadeIn .5s ease}.alert-success[_ngcontent-ng-c1879075166]{background-color:#e6ffe6;color:#28a745;border:1px solid #28a745}.alert-danger[_ngcontent-ng-c1879075166]{background-color:#ffe6e6;color:#dc3545;border:1px solid #dc3545}.back-button[_ngcontent-ng-c1879075166]{margin-bottom:20px;text-align:left}.btn-back[_ngcontent-ng-c1879075166]{background:#6c757d;color:#fff;border:none;padding:10px 20px;border-radius:50px;font-size:1rem;cursor:pointer;transition:all .3s ease;display:inline-flex;align-items:center;gap:8px;box-shadow:0 8px 15px #6c757d66}.btn-back[_ngcontent-ng-c1879075166]:hover{background:#5a6268;transform:translateY(-2px);box-shadow:0 10px 20px #5a626880}.btn-back[_ngcontent-ng-c1879075166]:active{transform:translateY(2px)}@keyframes _ngcontent-ng-c1879075166_fadeIn{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@keyframes _ngcontent-ng-c1879075166_spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}@media (max-width: 768px){.form-card[_ngcontent-ng-c1879075166]{padding:20px 30px}.btn-submit[_ngcontent-ng-c1879075166], .btn-back[_ngcontent-ng-c1879075166]{padding:10px 15px}}</style></head>
<body><!--nghm--><script type="text/javascript" id="ng-event-dispatch-contract">(()=>{function p(t,n,r,o,e,i,f,m){return{eventType:t,event:n,targetElement:r,eic:o,timeStamp:e,eia:i,eirp:f,eiack:m}}function u(t){let n=[],r=e=>{n.push(e)};return{c:t,q:n,et:[],etc:[],d:r,h:e=>{r(p(e.type,e,e.target,t,Date.now()))}}}function s(t,n,r){for(let o=0;o<n.length;o++){let e=n[o];(r?t.etc:t.et).push(e),t.c.addEventListener(e,t.h,r)}}function c(t,n,r,o,e=window){let i=u(t);e._ejsas||(e._ejsas={}),e._ejsas[n]=i,s(i,r),s(i,o,!0)}window.__jsaction_bootstrap=c;})();
</script><script>window.__jsaction_bootstrap(document.body,"ng",["click","submit","input","compositionstart","compositionend","change"],["blur"]);</script>
  <app-root ng-version="19.0.5" ngh="3" ng-server-context="ssg"><router-outlet></router-outlet><app-admin ngh="2"><app-navbar _nghost-ng-c902998988 ngh="0"><nav _ngcontent-ng-c902998988 class="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg sticky-top"><div _ngcontent-ng-c902998988 class="container"><a _ngcontent-ng-c902998988 routerlink="/" class="navbar-brand" href="/" jsaction="click:;"><img _ngcontent-ng-c902998988 src="https://iili.io/2gvDOlt.th.png" width="60" height="60" class="d-inline-block align-text-top brand-logo"></a><button _ngcontent-ng-c902998988 type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler"><span _ngcontent-ng-c902998988 class="navbar-toggler-icon"></span></button><div _ngcontent-ng-c902998988 id="navbarNav" class="collapse navbar-collapse"><ul _ngcontent-ng-c902998988 class="navbar-nav ms-auto"><li _ngcontent-ng-c902998988 class="nav-item"><a _ngcontent-ng-c902998988 routerlink="/admin" routerlinkactive="active-link" class="nav-link" href="/admin" jsaction="click:;"><i _ngcontent-ng-c902998988 class="fas fa-home me-2"></i> Accueil </a></li><li _ngcontent-ng-c902998988 class="nav-item dropdown"><a _ngcontent-ng-c902998988 href="#" id="advertisementDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" class="nav-link dropdown-toggle"><i _ngcontent-ng-c902998988 class="fas fa-bullhorn me-2"></i> Advertisement </a><ul _ngcontent-ng-c902998988 aria-labelledby="advertisementDropdown" class="dropdown-menu shadow-lg"><li _ngcontent-ng-c902998988><a _ngcontent-ng-c902998988 routerlink="/admin/ads" routerlinkactive="active-link" class="dropdown-item" href="/admin/ads" jsaction="click:;"><i _ngcontent-ng-c902998988 class="fas fa-list me-2"></i> Advertisement List </a></li><li _ngcontent-ng-c902998988><a _ngcontent-ng-c902998988 routerlink="/admin/newAds" routerlinkactive="active-link" class="dropdown-item" href="/admin/newAds" jsaction="click:;"><i _ngcontent-ng-c902998988 class="fas fa-plus-circle me-2"></i> Add Advertisement </a></li><li _ngcontent-ng-c902998988><a _ngcontent-ng-c902998988 routerlink="/admin/archivedAds" routerlinkactive="active-link" class="dropdown-item" href="/admin/archivedAds" jsaction="click:;"><i _ngcontent-ng-c902998988 class="fas fa-archive me-2"></i> View Archived </a></li></ul></li><li _ngcontent-ng-c902998988 class="nav-item dropdown"><a _ngcontent-ng-c902998988 href="#" id="devicesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" class="nav-link dropdown-toggle"><i _ngcontent-ng-c902998988 class="fas fa-tablet-alt me-2"></i> Devices </a><ul _ngcontent-ng-c902998988 aria-labelledby="devicesDropdown" class="dropdown-menu shadow-lg"><li _ngcontent-ng-c902998988><a _ngcontent-ng-c902998988 routerlink="/admin/Devices" routerlinkactive="active-link" class="dropdown-item" href="/admin/Devices" jsaction="click:;"><i _ngcontent-ng-c902998988 class="fas fa-list me-2"></i> Device List </a></li><li _ngcontent-ng-c902998988><a _ngcontent-ng-c902998988 routerlink="/admin/addDevices" routerlinkactive="active-link" class="dropdown-item" href="/admin/addDevices" jsaction="click:;"><i _ngcontent-ng-c902998988 class="fas fa-plus-circle me-2"></i> Add Device </a></li><li _ngcontent-ng-c902998988><a _ngcontent-ng-c902998988 routerlink="/admin/archivedDevices" routerlinkactive="active-link" class="dropdown-item" href="/admin/archivedDevices" jsaction="click:;"><i _ngcontent-ng-c902998988 class="fas fa-archive me-2"></i> View Archived </a></li></ul></li><li _ngcontent-ng-c902998988 class="nav-item"><a _ngcontent-ng-c902998988 href="#" class="btn btn-glow ms-3"><i _ngcontent-ng-c902998988 class="fas fa-sign-out-alt me-2"></i> Logout </a></li></ul></div></div></nav></app-navbar><router-outlet></router-outlet><app-add-advertisement _nghost-ng-c1879075166 ngh="1"><div _ngcontent-ng-c1879075166 class="container form-container"><div _ngcontent-ng-c1879075166 class="form-card"><div _ngcontent-ng-c1879075166 class="back-button mb-5"><button _ngcontent-ng-c1879075166 class="btn-back" jsaction="click:;"><i _ngcontent-ng-c1879075166 class="fas fa-arrow-left me-2"></i>Back to List </button></div><h2 _ngcontent-ng-c1879075166 class="form-title"><i _ngcontent-ng-c1879075166 class="fas fa-ad me-2"></i>Add Advertisement </h2><!----><!----><form _ngcontent-ng-c1879075166 novalidate class="ng-untouched ng-pristine ng-valid" jsaction="submit:;"><div _ngcontent-ng-c1879075166 class="form-group"><label _ngcontent-ng-c1879075166 for="name"><i _ngcontent-ng-c1879075166 class="fas fa-tag me-2"></i>Name </label><input _ngcontent-ng-c1879075166 type="text" id="name" name="name" required class="form-control ng-untouched ng-pristine ng-valid" jsaction="input:;blur:;compositionstart:;compositionend:;"></div><div _ngcontent-ng-c1879075166 class="form-group"><label _ngcontent-ng-c1879075166 for="description"><i _ngcontent-ng-c1879075166 class="fas fa-align-left me-2"></i>Description </label><textarea _ngcontent-ng-c1879075166 id="description" name="description" rows="3" required class="form-control ng-untouched ng-pristine ng-valid" jsaction="input:;blur:;compositionstart:;compositionend:;"></textarea></div><div _ngcontent-ng-c1879075166 class="form-group"><label _ngcontent-ng-c1879075166 for="videoUrl"><i _ngcontent-ng-c1879075166 class="fas fa-link me-2"></i>Video URL </label><input _ngcontent-ng-c1879075166 type="url" id="videoUrl" name="videoUrl" required class="form-control ng-untouched ng-pristine ng-valid" jsaction="input:;blur:;compositionstart:;compositionend:;"><small _ngcontent-ng-c1879075166 class="form-text text-muted"> Note: The video resolution should not exceed 1920x1080. </small><!----></div><div _ngcontent-ng-c1879075166 class="form-group"><label _ngcontent-ng-c1879075166 for="orientation"><i _ngcontent-ng-c1879075166 class="fas fa-arrows-alt me-2"></i>Orientation </label><select _ngcontent-ng-c1879075166 id="orientation" name="orientation" required class="form-control ng-untouched ng-pristine ng-valid" jsaction="change:;blur:;"><option _ngcontent-ng-c1879075166 value="portrait"> Portrait </option><option _ngcontent-ng-c1879075166 value="landscape"> Landscape </option><!----></select></div><button _ngcontent-ng-c1879075166 type="submit" class="btn-submit"><!----><i _ngcontent-ng-c1879075166 class="fas fa-paper-plane me-2"></i><!----><span _ngcontent-ng-c1879075166>Submit</span><!----></button></form></div></div></app-add-advertisement><!----></app-admin><!----></app-root>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
<link rel="modulepreload" href="chunk-L2642ATL.js"><script src="polyfills-EQXJKH7W.js" type="module"></script><script src="main-W62FPQBN.js" type="module"></script>

<script id="ng-state" type="application/json">{"__nghData__":[{},{"t":{"9":"t0","10":"t1","30":"t2","36":"t3","38":"t4","39":"t5","40":"t6"},"c":{"9":[],"10":[],"30":[],"36":[{"i":"t3","r":1,"x":2}],"38":[],"39":[{"i":"t5","r":1}],"40":[{"i":"t6","r":1}]}},{"c":{"1":[{"i":"c1879075166","r":1}]}},{"c":{"0":[{"i":"c1561001783","r":1}]}}]}</script></body></html>`;