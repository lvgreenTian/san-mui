<div
    class="{{ className }} sm-dropdown-menu {{ disabled | yesToBe('disabled') }}"
    style="{{ style | padStyles }}"
    >

    <div class="sm-dropdown-menu-selected" on-click="toggleMenu">
        <p
            class="sm-dropdown-menu-selected-label"
            style="{{ labelStyle | padStyles }}"
        >{{ text }}</p>
        <slot name="iconButton"></slot>
        <div class="sm-dropdown-menu-underline" style="{{ underlineStyle | padStyles }}"></div>
    </div>

    <div class="sm-menu-list depth-2{{ open | yesOrNoToBe('', ' list-hidden') }}"
        style="transform:{{ transform }};transform-origin:{{ transformOrigin }};left:{{ left }}px;top:{{ top }}px;{{ menuStyle | padStyles }};">

        <slot></slot>
    </div>
</div>