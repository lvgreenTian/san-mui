/**
 * @file testfield component
 * @author liuchaofan(asd123freedom@gmail.com)
 */

import san from 'san';
import Underline from './TextFieldUnderline';
import TextFieldLabel from './TextFieldLabel';
import TextFieldHint from './TextFieldHint';
import EnhancedTextarea from './TextFieldEnhancedTextarea';
import Icon from '../Icon';
import classNames from 'classnames';

export default san.defineComponent({
    template: `
<div class="sm-text-field {{computedClass}}"
    style="{{errorColor ? 'color:' + errorColor : ''}}">
    <sm-icon san-if="{{icon}}" class="sm-text-field-icon">{{icon}}</sm-icon>
    <div on-click="handleLabelClick" class="sm-text-field-content">
        <text-field-label
            san-if="{{label}}"
            float="{{getFloatValue}}"
            focus="{{focus}}"
            normalClass="{{labelClass}}"
            focusClass="{{labelFocusClass}}">
            <span>{{label}}</span>
        </text-field-label>
        <text-field-hint
            san-if="{{hintText}}"
            text="{{hintText}}"
            hintTextClass="{{hintTextClass}}"
            show="{{isHintShow}}">
        </text-field-hint>
            <slot>
                <input
                    san-if="!multiLine"
                    type="{{type}}"
                    value="{= inputValue =}"
                    disabled="{{disabled}}"
                    readonly="{{readOnly}}"
                    on-focus="handleFocus($event)"
                    on-input="handleChange($event)"
                    on-blur="handleBlur($event)"
                    on-keyup="handleKeyup($event)"
                    on-keypress="handleKeypress($event)"
                    on-keydown="handleKeydown($event)"
                    class="sm-text-field-input {{inputClass}}"/>
                <enhanced-textarea
                    san-if="multiLine"
                    normalClass="{{inputClass}}"
                    value="{= inputValue =}"
                    disabled="{{disabled}}"
                    readOnly="{{readOnly}}"
                    rows="{{rows}}"
                    rowsMax="{{rowsMax}}"
                    on-change="handleChange($event)"
                    on-focus="handleFocus($event)"
                    on-blur="handleBlur($event)"></enhanced-textarea>
            </slot>
        <underline
            san-if="underlineShow"
            error="{{!!errorText}}"
            disabled="{{disabled}}"
            errorColor="{{errorColor}}"
            focus="{{focus}}"
            normalClass="{{underlineClass}}"
            focusClass="{{underlineFocusClass}}">
        </underline>
        <div
            class="sm-text-field-help {{helpTextClass}}"
            style="{{errorColor ? ('color:' + errorColor) : ''}}"
            san-if="errorText || helpText || maxLength > 0">
            <div>
                {{errorText || helpText}}
            </div>
            <div san-if="maxLength > 0">
                {{charLength}}/{{maxLength}}
            </div>
        </div>
    </div>
</div>
`,

    initData() {
        return {
            type: 'text',
            label: '',
            labelFloat: false,
            labelClass: '',
            labelFocusClass: '',
            hintText: '',
            hintTextClass: '',
            inputClass: '',
            errorText: '',
            errorColor: '',
            helpText: '',
            helpTextClass: '',
            maxLength: 0,
            disabled: false,
            readOnly: false,
            fullWidth: 0,
            underlineShow: true,
            underlineClass: '',
            underlineFocusClass: '',
            focus: false,
            inputValue: '',
            charLength: 0,
            float: '',
            multiLine: false,
            icon: ''
        };
    },

    computed: {
        computedClass() {
            let focus = this.data.get('focus');
            let label = this.data.get('label');
            let errorText = this.data.get('errorText');
            let disabled = this.data.get('disabled');
            let fullWidth = this.data.get('fullWidth');
            let multiLine = this.data.get('multiLine');
            let icon = this.data.get('icon');
            return classNames(
                focus ? 'focus-state' : '',
                label ? 'has-label' : '',
                errorText ? 'error' : '',
                disabled ? 'disabled' : '',
                fullWidth ? 'full-width' : '',
                multiLine ? 'multi-line' : '',
                icon ? 'has-icon' : ''
            );
        },
        isHintShow() {
            let focus = this.data.get('focus');
            let inputValue = this.data.get('inputValue');
            let labelFloat = this.data.get('labelFloat');
            if ((!labelFloat || focus) && !inputValue && inputValue !== 0) {
                return true;
            }
            return false;
        },
        getFloatValue() {
            let focus = this.data.get('focus');
            let inputValue = this.data.get('inputValue');
            let labelFloat = this.data.get('labelFloat');
            if (labelFloat && !focus && !inputValue && inputValue !== 0) {
                return true;
            }
            return false;
        }
    },

    inited() {
        this.transBoolean('multiLine');
        this.transBoolean('labelFloat');
        this.transBoolean('fullWidth');
        this.transBoolean('disabled');
    },

    attached() {
        this.watch('inputValue', val => {
            let charLength = 0;
            let maxLength = +this.data.get('maxLength');
            charLength = maxLength && val ? val.length : 0;
            this.data.set('charLength', charLength);
            let isTextOverflow = this.data.get('isTextOverflow');
            if (charLength > maxLength && !isTextOverflow) {
                this.data.set('isTextOverflow', true);
                this.fire('textOverflow', 'true');
            }
            if (isTextOverflow && charLength <= maxLength) {
                this.data.set('isTextOverflow', false);
                this.fire('textOverflow', 'false');
            }
            // this.fire('input', val);
        });
    },
    handleFocus(event) {
        this.data.set('focus', true);
        this.fire('input-focus', event);
    },
    handleBlur(event) {
        this.data.set('focus', false);
        this.fire('input-blur', event);
    },
    handleChange(event) {
        this.fire('input-change', event);
    },
    handleKeyup(event) {
        this.fire('input-keyup', event);
    },
    handleKeypress(event) {
        this.fire('input-keypress', event);
    },
    handleKeydown(event) {
        this.fire('input-keydown', event);
    },

    /**
     * 布尔值转换，字符串false转换为布尔值false，其他则按正常转换进行转换
     *
     * @param  {string} key 要转换的数据key
     */
    transBoolean(key) {
        let value = this.data.get(key);
        this.data.set(key, value === 'false' ? false : !!value);
    },
    components: {
        'sm-icon': Icon,
        'underline': Underline,
        'enhanced-textarea': EnhancedTextarea,
        'text-field-label': TextFieldLabel,
        'text-field-hint': TextFieldHint
    }
});
