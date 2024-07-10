$('.accordion').accordion({
    header: '> .accordion-item > .accordion-header',
    heightStyle: 'content',
    active: true,
    collapsible: true
});

$('.accordion').sortable({
    handle: '.accordion-header',
    connectWith: '.accordion',
    placeholder: 'portlet-placeholder',
    containment: 'document'
});