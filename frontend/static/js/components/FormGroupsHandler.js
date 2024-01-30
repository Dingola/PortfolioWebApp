export default class FormGroupsHandler 
{
    constructor() 
    {
        this.setup_event_listeners();
    }

    setup_event_listeners() 
    {
        document.addEventListener('click', this.handle_form_click.bind(this));
        document.addEventListener('focusin', this.handle_form_focus.bind(this));
        document.addEventListener('focusout', this.handle_input_focus_out.bind(this));
    }

    handle_form_click(event) 
    {
        const form_group = event.target.closest('.form__group');
        this.handle_form_interaction(form_group, event.target);
    }

    handle_form_focus(event) 
    {
        const form_group = event.target.closest('.form__group');
        this.handle_form_interaction(form_group, event.target);
    }

    handle_form_interaction(form_group, target) 
    {
        if (form_group && target !== form_group)
        {
            if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') 
            {
                form_group.classList.add('js_transform_placeholder_to_label');
            } 
            else 
            {
                const input_field = form_group.querySelector('input, textarea');

                if (input_field)
                {
                    input_field.focus();
                    form_group.classList.add('js_transform_placeholder_to_label');
                }
            }
        }
    }

    handle_input_focus_out(event) 
    {
        const input_field = event.target;
        const form_group = input_field.closest('.form__group');

        if (form_group && (input_field.tagName === 'INPUT' || input_field.tagName === 'TEXTAREA')) 
        {
            if (input_field.value.trim() === '') 
            {
                form_group.classList.remove('js_transform_placeholder_to_label');
            }
        }
    }
}
