
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function set_store_value(store, ret, value = ret) {
        store.set(value);
        return ret;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.31.0' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = [];
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (let i = 0; i < subscribers.length; i += 1) {
                        const s = subscribers[i];
                        s[1]();
                        subscriber_queue.push(s, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.push(subscriber);
            if (subscribers.length === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                const index = subscribers.indexOf(subscriber);
                if (index !== -1) {
                    subscribers.splice(index, 1);
                }
                if (subscribers.length === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    let showSettings = writable(false);
    let query = writable('requests | limit 25');
    let error = writable('');

    let secretKey = writable(localStorage.getItem("secretKey") || "");
    secretKey.subscribe(val => localStorage.setItem("secretKey", val));
    let appId = writable(localStorage.getItem("appId") || "");
    appId.subscribe(val => localStorage.setItem("appId", val));

    /* src\Navigation.svelte generated by Svelte v3.31.0 */
    const file = "src\\Navigation.svelte";

    function create_fragment(ctx) {
    	let nav;
    	let div1;
    	let a0;
    	let t1;
    	let button;
    	let span;
    	let t2;
    	let div0;
    	let ul;
    	let li0;
    	let a1;
    	let li0_class_value;
    	let t4;
    	let li1;
    	let a2;
    	let li1_class_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			nav = element("nav");
    			div1 = element("div");
    			a0 = element("a");
    			a0.textContent = "App Insights";
    			t1 = space();
    			button = element("button");
    			span = element("span");
    			t2 = space();
    			div0 = element("div");
    			ul = element("ul");
    			li0 = element("li");
    			a1 = element("a");
    			a1.textContent = "Home";
    			t4 = space();
    			li1 = element("li");
    			a2 = element("a");
    			a2.textContent = "Settings";
    			attr_dev(a0, "class", "navbar-brand");
    			attr_dev(a0, "href", "#");
    			add_location(a0, file, 6, 2, 171);
    			attr_dev(span, "class", "navbar-toggler-icon");
    			add_location(span, file, 8, 2, 410);
    			attr_dev(button, "class", "navbar-toggler");
    			attr_dev(button, "type", "button");
    			attr_dev(button, "data-toggle", "collapse");
    			attr_dev(button, "data-target", "#navbarCollapse");
    			attr_dev(button, "aria-controls", "navbarCollapse");
    			attr_dev(button, "aria-expanded", "false");
    			attr_dev(button, "aria-label", "Toggle navigation");
    			add_location(button, file, 7, 2, 224);
    			attr_dev(a1, "class", "nav-link");
    			attr_dev(a1, "href", "#");
    			add_location(a1, file, 16, 3, 766);
    			attr_dev(li0, "class", li0_class_value = "nav-item " + (/*$showSettings*/ ctx[0] === false ? "active" : ""));
    			attr_dev(li0, "data-toggle", "collapse");
    			attr_dev(li0, "data-target", ".navbar-collapse.show");
    			add_location(li0, file, 15, 3, 639);
    			attr_dev(a2, "class", "nav-link");
    			attr_dev(a2, "href", "#");
    			add_location(a2, file, 21, 3, 1025);
    			attr_dev(li1, "class", li1_class_value = "nav-item " + (/*$showSettings*/ ctx[0] === true ? "active" : ""));
    			attr_dev(li1, "data-toggle", "collapse");
    			attr_dev(li1, "data-target", ".navbar-collapse.show");
    			add_location(li1, file, 20, 3, 899);
    			attr_dev(ul, "class", "navbar-nav mr-auto");
    			add_location(ul, file, 12, 2, 564);
    			attr_dev(div0, "class", "collapse navbar-collapse");
    			attr_dev(div0, "id", "navbarCollapse");
    			add_location(div0, file, 10, 2, 468);
    			attr_dev(div1, "class", "container");
    			add_location(div1, file, 5, 1, 144);
    			attr_dev(nav, "class", "navbar fixed-top navbar-expand-md navbar-light bg-light");
    			add_location(nav, file, 4, 0, 72);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, nav, anchor);
    			append_dev(nav, div1);
    			append_dev(div1, a0);
    			append_dev(div1, t1);
    			append_dev(div1, button);
    			append_dev(button, span);
    			append_dev(div1, t2);
    			append_dev(div1, div0);
    			append_dev(div0, ul);
    			append_dev(ul, li0);
    			append_dev(li0, a1);
    			append_dev(ul, t4);
    			append_dev(ul, li1);
    			append_dev(li1, a2);

    			if (!mounted) {
    				dispose = [
    					listen_dev(a1, "click", /*click_handler*/ ctx[1], false, false, false),
    					listen_dev(a2, "click", /*click_handler_1*/ ctx[2], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$showSettings*/ 1 && li0_class_value !== (li0_class_value = "nav-item " + (/*$showSettings*/ ctx[0] === false ? "active" : ""))) {
    				attr_dev(li0, "class", li0_class_value);
    			}

    			if (dirty & /*$showSettings*/ 1 && li1_class_value !== (li1_class_value = "nav-item " + (/*$showSettings*/ ctx[0] === true ? "active" : ""))) {
    				attr_dev(li1, "class", li1_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(nav);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let $showSettings;
    	validate_store(showSettings, "showSettings");
    	component_subscribe($$self, showSettings, $$value => $$invalidate(0, $showSettings = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Navigation", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Navigation> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => set_store_value(showSettings, $showSettings = false, $showSettings);
    	const click_handler_1 = () => set_store_value(showSettings, $showSettings = true, $showSettings);
    	$$self.$capture_state = () => ({ showSettings, $showSettings });
    	return [$showSettings, click_handler, click_handler_1];
    }

    class Navigation extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Navigation",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    /* src\AppInsightsConfig.svelte generated by Svelte v3.31.0 */
    const file$1 = "src\\AppInsightsConfig.svelte";

    function add_css() {
    	var style = element("style");
    	style.id = "svelte-1e7zlxh-style";
    	style.textContent = "input.svelte-1e7zlxh{width:100%}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwSW5zaWdodHNDb25maWcuc3ZlbHRlIiwic291cmNlcyI6WyJBcHBJbnNpZ2h0c0NvbmZpZy5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdD5cclxuICAgIGltcG9ydCB7IHNlY3JldEtleSwgYXBwSWQgfSBmcm9tIFwiLi9zdG9yZXMuanNcIjtcclxuPC9zY3JpcHQ+XHJcblxyXG48ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY29sLTMgdGV4dC1yaWdodFwiPlxyXG4gICAgICAgIEFwcGxpY2F0aW9uIElkOlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY29sLTlcIj5cclxuICAgICAgICA8aW5wdXQgYmluZDp2YWx1ZT17JGFwcElkfSAvPlxyXG4gICAgPC9kaXY+XHJcbjwvZGl2PlxyXG48ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY29sLTMgdGV4dC1yaWdodFwiPlxyXG4gICAgICAgIEFwcGxpY2F0aW9uIFNlY3JldCBLZXk6XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJjb2wtOVwiPlxyXG4gICAgICAgIDxpbnB1dCBiaW5kOnZhbHVlPXskc2VjcmV0S2V5fSAvPlxyXG4gICAgPC9kaXY+XHJcbjwvZGl2PlxyXG5cclxuPHN0eWxlPlxyXG5cdGlucHV0IHtcclxuXHRcdHdpZHRoOiAxMDAlO1xyXG5cdH1cdFxyXG48L3N0eWxlPlxyXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBc0JDLEtBQUssZUFBQyxDQUFDLEFBQ04sS0FBSyxDQUFFLElBQUksQUFDWixDQUFDIn0= */";
    	append_dev(document.head, style);
    }

    function create_fragment$1(ctx) {
    	let div2;
    	let div0;
    	let t1;
    	let div1;
    	let input0;
    	let t2;
    	let div5;
    	let div3;
    	let t4;
    	let div4;
    	let input1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			div0.textContent = "Application Id:";
    			t1 = space();
    			div1 = element("div");
    			input0 = element("input");
    			t2 = space();
    			div5 = element("div");
    			div3 = element("div");
    			div3.textContent = "Application Secret Key:";
    			t4 = space();
    			div4 = element("div");
    			input1 = element("input");
    			attr_dev(div0, "class", "col-3 text-right");
    			add_location(div0, file$1, 5, 4, 99);
    			attr_dev(input0, "class", "svelte-1e7zlxh");
    			add_location(input0, file$1, 9, 8, 201);
    			attr_dev(div1, "class", "col-9");
    			add_location(div1, file$1, 8, 4, 172);
    			attr_dev(div2, "class", "row");
    			add_location(div2, file$1, 4, 0, 76);
    			attr_dev(div3, "class", "col-3 text-right");
    			add_location(div3, file$1, 13, 4, 275);
    			attr_dev(input1, "class", "svelte-1e7zlxh");
    			add_location(input1, file$1, 17, 8, 385);
    			attr_dev(div4, "class", "col-9");
    			add_location(div4, file$1, 16, 4, 356);
    			attr_dev(div5, "class", "row");
    			add_location(div5, file$1, 12, 0, 252);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div2, t1);
    			append_dev(div2, div1);
    			append_dev(div1, input0);
    			set_input_value(input0, /*$appId*/ ctx[0]);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, div5, anchor);
    			append_dev(div5, div3);
    			append_dev(div5, t4);
    			append_dev(div5, div4);
    			append_dev(div4, input1);
    			set_input_value(input1, /*$secretKey*/ ctx[1]);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "input", /*input0_input_handler*/ ctx[2]),
    					listen_dev(input1, "input", /*input1_input_handler*/ ctx[3])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$appId*/ 1 && input0.value !== /*$appId*/ ctx[0]) {
    				set_input_value(input0, /*$appId*/ ctx[0]);
    			}

    			if (dirty & /*$secretKey*/ 2 && input1.value !== /*$secretKey*/ ctx[1]) {
    				set_input_value(input1, /*$secretKey*/ ctx[1]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(div5);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let $appId;
    	let $secretKey;
    	validate_store(appId, "appId");
    	component_subscribe($$self, appId, $$value => $$invalidate(0, $appId = $$value));
    	validate_store(secretKey, "secretKey");
    	component_subscribe($$self, secretKey, $$value => $$invalidate(1, $secretKey = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("AppInsightsConfig", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<AppInsightsConfig> was created with unknown prop '${key}'`);
    	});

    	function input0_input_handler() {
    		$appId = this.value;
    		appId.set($appId);
    	}

    	function input1_input_handler() {
    		$secretKey = this.value;
    		secretKey.set($secretKey);
    	}

    	$$self.$capture_state = () => ({ secretKey, appId, $appId, $secretKey });
    	return [$appId, $secretKey, input0_input_handler, input1_input_handler];
    }

    class AppInsightsConfig extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		if (!document.getElementById("svelte-1e7zlxh-style")) add_css();
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AppInsightsConfig",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\AppInsightsQuery.svelte generated by Svelte v3.31.0 */
    const file$2 = "src\\AppInsightsQuery.svelte";

    function add_css$1() {
    	var style = element("style");
    	style.id = "svelte-1l41vbm-style";
    	style.textContent = "textarea.svelte-1l41vbm{width:100%;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwSW5zaWdodHNRdWVyeS5zdmVsdGUiLCJzb3VyY2VzIjpbIkFwcEluc2lnaHRzUXVlcnkuc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQ+XHJcbiAgICBpbXBvcnQgeyBxdWVyeSB9IGZyb20gJy4vc3RvcmVzLmpzJztcclxuPC9zY3JpcHQ+XHJcblxyXG48ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY29sLTMgdGV4dC1yaWdodFwiPlxyXG4gICAgICAgIFF1ZXJ5OlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY29sLTlcIj5cclxuICAgICAgICA8dGV4dGFyZWEgYmluZDp2YWx1ZT17JHF1ZXJ5fS8+XHJcbiAgICA8L2Rpdj5cclxuPC9kaXY+XHJcblxyXG48c3R5bGU+XHJcblx0dGV4dGFyZWEge1xyXG5cdFx0d2lkdGg6IDEwMCU7XHJcblx0XHQtd2Via2l0LWJveC1zaXppbmc6IGJvcmRlci1ib3g7IC8qIFNhZmFyaS9DaHJvbWUsIG90aGVyIFdlYktpdCAqL1xyXG5cdFx0LW1vei1ib3gtc2l6aW5nOiBib3JkZXItYm94OyAgICAvKiBGaXJlZm94LCBvdGhlciBHZWNrbyAqL1xyXG5cdFx0Ym94LXNpemluZzogYm9yZGVyLWJveDsgICAgICAgICAvKiBPcGVyYS9JRSA4KyAqL1xyXG5cdH1cdFxyXG48L3N0eWxlPlxyXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBY0MsUUFBUSxlQUFDLENBQUMsQUFDVCxLQUFLLENBQUUsSUFBSSxDQUNYLGtCQUFrQixDQUFFLFVBQVUsQ0FDOUIsZUFBZSxDQUFFLFVBQVUsQ0FDM0IsVUFBVSxDQUFFLFVBQVUsQUFDdkIsQ0FBQyJ9 */";
    	append_dev(document.head, style);
    }

    function create_fragment$2(ctx) {
    	let div2;
    	let div0;
    	let t1;
    	let div1;
    	let textarea;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			div0.textContent = "Query:";
    			t1 = space();
    			div1 = element("div");
    			textarea = element("textarea");
    			attr_dev(div0, "class", "col-3 text-right");
    			add_location(div0, file$2, 5, 4, 88);
    			attr_dev(textarea, "class", "svelte-1l41vbm");
    			add_location(textarea, file$2, 9, 8, 181);
    			attr_dev(div1, "class", "col-9");
    			add_location(div1, file$2, 8, 4, 152);
    			attr_dev(div2, "class", "row");
    			add_location(div2, file$2, 4, 0, 65);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div2, t1);
    			append_dev(div2, div1);
    			append_dev(div1, textarea);
    			set_input_value(textarea, /*$query*/ ctx[0]);

    			if (!mounted) {
    				dispose = listen_dev(textarea, "input", /*textarea_input_handler*/ ctx[1]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$query*/ 1) {
    				set_input_value(textarea, /*$query*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let $query;
    	validate_store(query, "query");
    	component_subscribe($$self, query, $$value => $$invalidate(0, $query = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("AppInsightsQuery", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<AppInsightsQuery> was created with unknown prop '${key}'`);
    	});

    	function textarea_input_handler() {
    		$query = this.value;
    		query.set($query);
    	}

    	$$self.$capture_state = () => ({ query, $query });
    	return [$query, textarea_input_handler];
    }

    class AppInsightsQuery extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		if (!document.getElementById("svelte-1l41vbm-style")) add_css$1();
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AppInsightsQuery",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    class AppInsightsRepository {
        Execute(aiId, aiKey, query) {
            const url =  `https://api.applicationinsights.io/v1/apps/${aiId}/query?query=${encodeURI(query)}`;
            console.log(aiId);
            console.log(aiKey);
            console.log(query);
            return fetch(url, {
                headers: {
                  'x-api-key': aiKey
                }
              });
        }
    }

    var AppInsightsRepository_1 = AppInsightsRepository;

    /* src\AppInsightsResults.svelte generated by Svelte v3.31.0 */

    const { console: console_1 } = globals;
    const file$3 = "src\\AppInsightsResults.svelte";

    function create_fragment$3(ctx) {
    	let div1;
    	let div0;
    	let button;
    	let t1;
    	let div4;
    	let div2;
    	let t3;
    	let div3;
    	let canvas;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			button = element("button");
    			button.textContent = "Execute";
    			t1 = space();
    			div4 = element("div");
    			div2 = element("div");
    			div2.textContent = "Results:";
    			t3 = space();
    			div3 = element("div");
    			canvas = element("canvas");
    			attr_dev(button, "class", "float-right");
    			add_location(button, file$3, 66, 8, 1924);
    			attr_dev(div0, "class", "col-12");
    			add_location(div0, file$3, 65, 4, 1894);
    			attr_dev(div1, "class", "row");
    			add_location(div1, file$3, 64, 0, 1871);
    			attr_dev(div2, "class", "col-3 text-right");
    			add_location(div2, file$3, 70, 4, 2039);
    			attr_dev(canvas, "id", "aiResults");
    			attr_dev(canvas, "width", "200");
    			attr_dev(canvas, "height", "200");
    			add_location(canvas, file$3, 74, 8, 2134);
    			attr_dev(div3, "class", "col-9");
    			add_location(div3, file$3, 73, 4, 2105);
    			attr_dev(div4, "class", "row");
    			add_location(div4, file$3, 69, 0, 2016);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, button);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div2);
    			append_dev(div4, t3);
    			append_dev(div4, div3);
    			append_dev(div3, canvas);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*executeQuery*/ ctx[0], false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div4);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let $error;
    	let $appId;
    	let $secretKey;
    	let $query;
    	validate_store(error, "error");
    	component_subscribe($$self, error, $$value => $$invalidate(1, $error = $$value));
    	validate_store(appId, "appId");
    	component_subscribe($$self, appId, $$value => $$invalidate(2, $appId = $$value));
    	validate_store(secretKey, "secretKey");
    	component_subscribe($$self, secretKey, $$value => $$invalidate(3, $secretKey = $$value));
    	validate_store(query, "query");
    	component_subscribe($$self, query, $$value => $$invalidate(4, $query = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("AppInsightsResults", slots, []);
    	let aiRepository = new AppInsightsRepository_1();

    	async function executeQuery() {
    		// event handler code goes here
    		// console.log($query);
    		set_store_value(error, $error = "", $error);

    		let promise = await aiRepository.Execute($appId, $secretKey, $query);
    		var results = await promise.text();
    		buildChart(JSON.parse(results));
    	}

    	async function buildChart(results) {
    		try {
    			var ctx = document.getElementById("aiResults").getContext("2d");

    			const formattedData = results.tables[0].rows.map(r => {
    				return { x: new Date(r[0]), y: r[7] };
    			});

    			formattedData.sort((a, b) => {
    				return a.x - b.x;
    			});

    			console.log(formattedData);

    			new Chart(ctx,
    			{
    					type: "line",
    					data: { datasets: [{ data: formattedData }] },
    					options: {
    						scales: {
    							xAxes: [{ type: "time" }],
    							yAxes: [
    								{
    									display: true,
    									scaleLabel: { display: true, labelString: "duration" }
    								}
    							]
    						}
    					}
    				});
    		} catch {
    			set_store_value(error, $error = "There was a problem", $error);
    		}
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<AppInsightsResults> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		query,
    		secretKey,
    		appId,
    		error,
    		AppInsightsRepository: AppInsightsRepository_1,
    		aiRepository,
    		executeQuery,
    		buildChart,
    		$error,
    		$appId,
    		$secretKey,
    		$query
    	});

    	$$self.$inject_state = $$props => {
    		if ("aiRepository" in $$props) aiRepository = $$props.aiRepository;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [executeQuery];
    }

    class AppInsightsResults extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AppInsightsResults",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src\Error.svelte generated by Svelte v3.31.0 */

    const { Error: Error_1 } = globals;
    const file$4 = "src\\Error.svelte";

    // (5:0) {#if $error}
    function create_if_block(ctx) {
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(/*$error*/ ctx[0]);
    			attr_dev(div, "class", "alert alert-danger");
    			attr_dev(div, "role", "alert");
    			add_location(div, file$4, 5, 0, 79);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$error*/ 1) set_data_dev(t, /*$error*/ ctx[0]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(5:0) {#if $error}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let if_block_anchor;
    	let if_block = /*$error*/ ctx[0] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error_1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*$error*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let $error;
    	validate_store(error, "error");
    	component_subscribe($$self, error, $$value => $$invalidate(0, $error = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Error", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Error> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ error, $error });
    	return [$error];
    }

    class Error$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Error",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.31.0 */

    const { Error: Error_1$1 } = globals;
    const file$5 = "src\\App.svelte";

    function add_css$2() {
    	var style = element("style");
    	style.id = "svelte-1tky8bj-style";
    	style.textContent = "main.svelte-1tky8bj{text-align:center;padding:1em;max-width:240px;margin:0 auto}@media(min-width: 640px){main.svelte-1tky8bj{max-width:none}}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwLnN2ZWx0ZSIsInNvdXJjZXMiOlsiQXBwLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0PlxyXG5cdGltcG9ydCBOYXZpZ2F0aW9uIGZyb20gJy4vTmF2aWdhdGlvbi5zdmVsdGUnO1xyXG5cdGltcG9ydCBBcHBJbnNpZ2h0c0NvbmZpZyBmcm9tICcuL0FwcEluc2lnaHRzQ29uZmlnLnN2ZWx0ZSc7XHJcblx0aW1wb3J0IEFwcEluc2lnaHRzUXVlcnkgZnJvbSAnLi9BcHBJbnNpZ2h0c1F1ZXJ5LnN2ZWx0ZSc7XHJcblx0aW1wb3J0IEFwcEluc2lnaHRzUmVzdWx0cyBmcm9tICcuL0FwcEluc2lnaHRzUmVzdWx0cy5zdmVsdGUnO1xyXG5cdGltcG9ydCBFcnJvciBmcm9tICcuL0Vycm9yLnN2ZWx0ZSc7XHJcbiAgICBpbXBvcnQgeyBzaG93U2V0dGluZ3MgfSBmcm9tICcuL3N0b3Jlcy5qcyc7XHJcbjwvc2NyaXB0PlxyXG5cclxuPG1haW4+XHJcblxyXG5cdDxOYXZpZ2F0aW9uIC8+XHJcblx0PEVycm9yIC8+XHJcblx0eyNpZiAkc2hvd1NldHRpbmdzfVxyXG5cdDxBcHBJbnNpZ2h0c0NvbmZpZyAvPlxyXG5cdHs6ZWxzZX1cclxuXHQ8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XHJcblx0XHQ8QXBwSW5zaWdodHNRdWVyeSAvPlxyXG5cdFx0PEFwcEluc2lnaHRzUmVzdWx0cyAvPlxyXG5cdDwvZGl2PlxyXG5cdHsvaWZ9XHJcbjwvbWFpbj5cclxuXHJcbjxzdHlsZT5cclxuXHRtYWluIHtcclxuXHRcdHRleHQtYWxpZ246IGNlbnRlcjtcclxuXHRcdHBhZGRpbmc6IDFlbTtcclxuXHRcdG1heC13aWR0aDogMjQwcHg7XHJcblx0XHRtYXJnaW46IDAgYXV0bztcclxuXHR9XHJcblxyXG5cdGgxIHtcclxuXHRcdGNvbG9yOiAjZmYzZTAwO1xyXG5cdFx0dGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuXHRcdGZvbnQtc2l6ZTogNGVtO1xyXG5cdFx0Zm9udC13ZWlnaHQ6IDEwMDtcclxuXHR9XHJcblxyXG5cdEBtZWRpYSAobWluLXdpZHRoOiA2NDBweCkge1xyXG5cdFx0bWFpbiB7XHJcblx0XHRcdG1heC13aWR0aDogbm9uZTtcclxuXHRcdH1cclxuXHR9XHJcbjwvc3R5bGU+Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXdCQyxJQUFJLGVBQUMsQ0FBQyxBQUNMLFVBQVUsQ0FBRSxNQUFNLENBQ2xCLE9BQU8sQ0FBRSxHQUFHLENBQ1osU0FBUyxDQUFFLEtBQUssQ0FDaEIsTUFBTSxDQUFFLENBQUMsQ0FBQyxJQUFJLEFBQ2YsQ0FBQyxBQVNELE1BQU0sQUFBQyxZQUFZLEtBQUssQ0FBQyxBQUFDLENBQUMsQUFDMUIsSUFBSSxlQUFDLENBQUMsQUFDTCxTQUFTLENBQUUsSUFBSSxBQUNoQixDQUFDLEFBQ0YsQ0FBQyJ9 */";
    	append_dev(document.head, style);
    }

    // (16:1) {:else}
    function create_else_block(ctx) {
    	let div;
    	let appinsightsquery;
    	let t;
    	let appinsightsresults;
    	let current;
    	appinsightsquery = new AppInsightsQuery({ $$inline: true });
    	appinsightsresults = new AppInsightsResults({ $$inline: true });

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(appinsightsquery.$$.fragment);
    			t = space();
    			create_component(appinsightsresults.$$.fragment);
    			attr_dev(div, "class", "container");
    			add_location(div, file$5, 16, 1, 440);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(appinsightsquery, div, null);
    			append_dev(div, t);
    			mount_component(appinsightsresults, div, null);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(appinsightsquery.$$.fragment, local);
    			transition_in(appinsightsresults.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(appinsightsquery.$$.fragment, local);
    			transition_out(appinsightsresults.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(appinsightsquery);
    			destroy_component(appinsightsresults);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(16:1) {:else}",
    		ctx
    	});

    	return block;
    }

    // (14:1) {#if $showSettings}
    function create_if_block$1(ctx) {
    	let appinsightsconfig;
    	let current;
    	appinsightsconfig = new AppInsightsConfig({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(appinsightsconfig.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(appinsightsconfig, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(appinsightsconfig.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(appinsightsconfig.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(appinsightsconfig, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(14:1) {#if $showSettings}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let main;
    	let navigation;
    	let t0;
    	let error;
    	let t1;
    	let current_block_type_index;
    	let if_block;
    	let current;
    	navigation = new Navigation({ $$inline: true });
    	error = new Error$1({ $$inline: true });
    	const if_block_creators = [create_if_block$1, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*$showSettings*/ ctx[0]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(navigation.$$.fragment);
    			t0 = space();
    			create_component(error.$$.fragment);
    			t1 = space();
    			if_block.c();
    			attr_dev(main, "class", "svelte-1tky8bj");
    			add_location(main, file$5, 9, 0, 344);
    		},
    		l: function claim(nodes) {
    			throw new Error_1$1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(navigation, main, null);
    			append_dev(main, t0);
    			mount_component(error, main, null);
    			append_dev(main, t1);
    			if_blocks[current_block_type_index].m(main, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index !== previous_block_index) {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(main, null);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(navigation.$$.fragment, local);
    			transition_in(error.$$.fragment, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(navigation.$$.fragment, local);
    			transition_out(error.$$.fragment, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(navigation);
    			destroy_component(error);
    			if_blocks[current_block_type_index].d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let $showSettings;
    	validate_store(showSettings, "showSettings");
    	component_subscribe($$self, showSettings, $$value => $$invalidate(0, $showSettings = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("App", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Navigation,
    		AppInsightsConfig,
    		AppInsightsQuery,
    		AppInsightsResults,
    		Error: Error$1,
    		showSettings,
    		$showSettings
    	});

    	return [$showSettings];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		if (!document.getElementById("svelte-1tky8bj-style")) add_css$2();
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
