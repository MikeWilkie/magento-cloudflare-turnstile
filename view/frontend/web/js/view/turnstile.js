/**
 * Copyright (C) 2023 Pixel Développement
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/*global define*/
define(
    [
        'jquery',
        'PixelOpen_CloudflareTurnstile/js/view/component',
        'Magento_Customer/js/customer-data'
    ],
    function (
        $,
        Component,
        customerData
    ) {
        'use strict';

        return Component.extend({
            customer: customerData.get('customer'),

            /**
             * Can show widget
             *
             * @returns {boolean}
             */
            canShow: function () {
                if (this.customer().firstname) {
                    return false;
                }

                return this._super();
            },

            /**
             * Before Render
             */
            beforeRender: function () {
                if (this.action === 'login-ajax') {
                    this.loginAjax();
                }

                this._super();
            },

            /**
             * After render widget
             */
            afterRender: function () {
                if (this.action === 'login-ajax') {
                    this.loginAjaxComplete();
                }

                this._super();
            },

            /**
             * Render the widget when authentication popup is open
             */
            loginAjax: function () {
                this.autoRender = false;

                $('.block-authentication').on('contentUpdated', function () {
                    this.render();
                }.bind(this));
            },

            /**
             * Reset turnstile when Ajax request is complete with error
             */
            loginAjaxComplete: function () {
                if (this.widgetId) {
                    $(document).on('ajaxComplete', function (event, xhr) {
                        const result = xhr.responseJSON;
                        if (result.hasOwnProperty('errors')) {
                            if (result.errors) {
                                this.reset();
                            }
                        }
                    }.bind(this));
                }
            }
        });
    }
);
