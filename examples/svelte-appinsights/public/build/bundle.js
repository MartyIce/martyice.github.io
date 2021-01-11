
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

    let query = writable('requests | limit 25');
    let secretKey = writable('');
    let appId = writable('');
    let error = writable('');

    /* src\AppInsightsConfig.svelte generated by Svelte v3.31.0 */
    const file = "src\\AppInsightsConfig.svelte";

    function create_fragment(ctx) {
    	let div0;
    	let t0;
    	let input0;
    	let t1;
    	let div1;
    	let t2;
    	let input1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			t0 = text("ApplicationId: ");
    			input0 = element("input");
    			t1 = space();
    			div1 = element("div");
    			t2 = text("ApplicationSecretKey: ");
    			input1 = element("input");
    			add_location(input0, file, 4, 32, 108);
    			attr_dev(div0, "class", "row");
    			add_location(div0, file, 4, 0, 76);
    			add_location(input1, file, 5, 39, 184);
    			attr_dev(div1, "class", "row");
    			add_location(div1, file, 5, 0, 145);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, t0);
    			append_dev(div0, input0);
    			set_input_value(input0, /*$appId*/ ctx[0]);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, t2);
    			append_dev(div1, input1);
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
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
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
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AppInsightsConfig",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    /* src\AppInsightsQuery.svelte generated by Svelte v3.31.0 */
    const file$1 = "src\\AppInsightsQuery.svelte";

    function create_fragment$1(ctx) {
    	let div;
    	let t;
    	let textarea;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text("Query:\r\n");
    			textarea = element("textarea");
    			add_location(textarea, file$1, 6, 0, 92);
    			attr_dev(div, "class", "row");
    			add_location(div, file$1, 4, 0, 65);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    			append_dev(div, textarea);
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
    			if (detaching) detach_dev(div);
    			mounted = false;
    			dispose();
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
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AppInsightsQuery",
    			options,
    			id: create_fragment$1.name
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
    const file$2 = "src\\AppInsightsResults.svelte";

    function create_fragment$2(ctx) {
    	let div0;
    	let button;
    	let t1;
    	let div1;
    	let t2;
    	let canvas;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			button = element("button");
    			button.textContent = "Execute";
    			t1 = space();
    			div1 = element("div");
    			t2 = text("Results:\r\n    ");
    			canvas = element("canvas");
    			add_location(button, file$2, 64, 17, 1888);
    			attr_dev(div0, "class", "row");
    			add_location(div0, file$2, 64, 0, 1871);
    			attr_dev(canvas, "id", "aiResults");
    			attr_dev(canvas, "width", "200");
    			attr_dev(canvas, "height", "200");
    			add_location(canvas, file$2, 67, 4, 1983);
    			attr_dev(div1, "class", "row");
    			add_location(div1, file$2, 65, 0, 1946);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, button);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, t2);
    			append_dev(div1, canvas);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*executeQuery*/ ctx[0], false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
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
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AppInsightsResults",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src\Error.svelte generated by Svelte v3.31.0 */

    const { Error: Error_1 } = globals;
    const file$3 = "src\\Error.svelte";

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
    			add_location(div, file$3, 5, 0, 79);
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

    function create_fragment$3(ctx) {
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
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
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
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Error",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.31.0 */

    const { Error: Error_1$1 } = globals;
    const file$4 = "src\\App.svelte";

    function add_css() {
    	var style = element("style");
    	style.id = "svelte-1tky8bj-style";
    	style.textContent = "main.svelte-1tky8bj{text-align:center;padding:1em;max-width:240px;margin:0 auto}@media(min-width: 640px){main.svelte-1tky8bj{max-width:none}}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwLnN2ZWx0ZSIsInNvdXJjZXMiOlsiQXBwLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0PlxyXG5cdGxldCBzaG93U2V0dGluZ3MgPSBmYWxzZTtcclxuXHRpbXBvcnQgQXBwSW5zaWdodHNDb25maWcgZnJvbSAnLi9BcHBJbnNpZ2h0c0NvbmZpZy5zdmVsdGUnO1xyXG5cdGltcG9ydCBBcHBJbnNpZ2h0c1F1ZXJ5IGZyb20gJy4vQXBwSW5zaWdodHNRdWVyeS5zdmVsdGUnO1xyXG5cdGltcG9ydCBBcHBJbnNpZ2h0c1Jlc3VsdHMgZnJvbSAnLi9BcHBJbnNpZ2h0c1Jlc3VsdHMuc3ZlbHRlJztcclxuXHRpbXBvcnQgRXJyb3IgZnJvbSAnLi9FcnJvci5zdmVsdGUnO1xyXG48L3NjcmlwdD5cclxuXHJcbjxtYWluPlxyXG5cclxuXHQ8bmF2IGNsYXNzPVwibmF2YmFyIGZpeGVkLXRvcCBuYXZiYXItZXhwYW5kLW1kIG5hdmJhci1saWdodCBiZy1saWdodFwiPlxyXG5cdFx0PGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxyXG5cdFx0ICA8YSBjbGFzcz1cIm5hdmJhci1icmFuZFwiIGhyZWY9XCIjXCI+QXBwIEluc2lnaHRzPC9hPlxyXG5cdFx0ICA8YnV0dG9uIGNsYXNzPVwibmF2YmFyLXRvZ2dsZXJcIiB0eXBlPVwiYnV0dG9uXCIgZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiIGRhdGEtdGFyZ2V0PVwiI25hdmJhckNvbGxhcHNlXCIgYXJpYS1jb250cm9scz1cIm5hdmJhckNvbGxhcHNlXCIgYXJpYS1leHBhbmRlZD1cImZhbHNlXCIgYXJpYS1sYWJlbD1cIlRvZ2dsZSBuYXZpZ2F0aW9uXCI+XHJcblx0XHRcdDxzcGFuIGNsYXNzPVwibmF2YmFyLXRvZ2dsZXItaWNvblwiPjwvc3Bhbj5cclxuXHRcdCAgPC9idXR0b24+XHJcblx0XHQgIDxkaXYgY2xhc3M9XCJjb2xsYXBzZSBuYXZiYXItY29sbGFwc2VcIiBpZD1cIm5hdmJhckNvbGxhcHNlXCI+XHJcblx0XHRcdDwhLS0gbGVmdCBuYXZpZ2F0aW9uIGxpbmtzIC0tPlxyXG5cdFx0XHQ8dWwgY2xhc3M9XCJuYXZiYXItbmF2IG1yLWF1dG9cIj5cclxuXHQgIFxyXG5cdFx0XHQgIDwhLS0gYWN0aXZlIG5hdmlnYXRpb24gbGluayAtLT5cclxuXHRcdFx0ICA8bGkgY2xhc3M9XCJuYXYtaXRlbSBhY3RpdmVcIiBkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCIgZGF0YS10YXJnZXQ9XCIubmF2YmFyLWNvbGxhcHNlLnNob3dcIj5cclxuXHRcdFx0XHQ8YSBjbGFzcz1cIm5hdi1saW5rXCIgaHJlZj1cIiNcIiBvbjpjbGljaz1cInsoKSA9PiBzaG93U2V0dGluZ3MgPSBmYWxzZX1cIj5Ib21lPC9hPlxyXG5cdFx0XHQgIDwvbGk+XHJcblx0ICBcclxuXHRcdFx0ICA8IS0tIHJlZ3VsYXIgbmF2aWdhdGlvbiBsaW5rIC0tPlxyXG5cdFx0XHQgIDxsaSBjbGFzcz1cIm5hdi1pdGVtXCIgZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiIGRhdGEtdGFyZ2V0PVwiLm5hdmJhci1jb2xsYXBzZS5zaG93XCI+XHJcblx0XHRcdFx0PGEgY2xhc3M9XCJuYXYtbGlua1wiIGhyZWY9XCIjXCIgb246Y2xpY2s9XCJ7KCkgPT4gc2hvd1NldHRpbmdzID0gdHJ1ZX1cIj5TZXR0aW5nczwvYT5cclxuXHRcdFx0PC9saT5cclxuXHRcdFx0PC91bD5cclxuXHRcdCAgPC9kaXY+XHJcblx0XHQ8L2Rpdj5cclxuXHQgIDwvbmF2PlxyXG5cclxuIFxyXG5cdDxFcnJvciAvPlxyXG5cdHsjaWYgc2hvd1NldHRpbmdzfVxyXG5cdDxBcHBJbnNpZ2h0c0NvbmZpZyAvPlxyXG5cdHs6ZWxzZX1cclxuXHQ8QXBwSW5zaWdodHNRdWVyeSAvPlxyXG5cdDxBcHBJbnNpZ2h0c1Jlc3VsdHMgLz5cclxuXHR7L2lmfVxyXG48L21haW4+XHJcblxyXG48c3R5bGU+XHJcblx0bWFpbiB7XHJcblx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblx0XHRwYWRkaW5nOiAxZW07XHJcblx0XHRtYXgtd2lkdGg6IDI0MHB4O1xyXG5cdFx0bWFyZ2luOiAwIGF1dG87XHJcblx0fVxyXG5cclxuXHRoMSB7XHJcblx0XHRjb2xvcjogI2ZmM2UwMDtcclxuXHRcdHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcblx0XHRmb250LXNpemU6IDRlbTtcclxuXHRcdGZvbnQtd2VpZ2h0OiAxMDA7XHJcblx0fVxyXG5cclxuXHRAbWVkaWEgKG1pbi13aWR0aDogNjQwcHgpIHtcclxuXHRcdG1haW4ge1xyXG5cdFx0XHRtYXgtd2lkdGg6IG5vbmU7XHJcblx0XHR9XHJcblx0fVxyXG48L3N0eWxlPiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE2Q0MsSUFBSSxlQUFDLENBQUMsQUFDTCxVQUFVLENBQUUsTUFBTSxDQUNsQixPQUFPLENBQUUsR0FBRyxDQUNaLFNBQVMsQ0FBRSxLQUFLLENBQ2hCLE1BQU0sQ0FBRSxDQUFDLENBQUMsSUFBSSxBQUNmLENBQUMsQUFTRCxNQUFNLEFBQUMsWUFBWSxLQUFLLENBQUMsQUFBQyxDQUFDLEFBQzFCLElBQUksZUFBQyxDQUFDLEFBQ0wsU0FBUyxDQUFFLElBQUksQUFDaEIsQ0FBQyxBQUNGLENBQUMifQ== */";
    	append_dev(document.head, style);
    }

    // (39:1) {:else}
    function create_else_block(ctx) {
    	let appinsightsquery;
    	let t;
    	let appinsightsresults;
    	let current;
    	appinsightsquery = new AppInsightsQuery({ $$inline: true });
    	appinsightsresults = new AppInsightsResults({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(appinsightsquery.$$.fragment);
    			t = space();
    			create_component(appinsightsresults.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(appinsightsquery, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(appinsightsresults, target, anchor);
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
    			destroy_component(appinsightsquery, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(appinsightsresults, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(39:1) {:else}",
    		ctx
    	});

    	return block;
    }

    // (37:1) {#if showSettings}
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
    		source: "(37:1) {#if showSettings}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let main;
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
    	let t4;
    	let li1;
    	let a2;
    	let t6;
    	let error;
    	let t7;
    	let current_block_type_index;
    	let if_block;
    	let current;
    	let mounted;
    	let dispose;
    	error = new Error$1({ $$inline: true });
    	const if_block_creators = [create_if_block$1, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*showSettings*/ ctx[0]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			main = element("main");
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
    			t6 = space();
    			create_component(error.$$.fragment);
    			t7 = space();
    			if_block.c();
    			attr_dev(a0, "class", "navbar-brand");
    			attr_dev(a0, "href", "#");
    			add_location(a0, file$4, 12, 4, 388);
    			attr_dev(span, "class", "navbar-toggler-icon");
    			add_location(span, file$4, 14, 3, 630);
    			attr_dev(button, "class", "navbar-toggler");
    			attr_dev(button, "type", "button");
    			attr_dev(button, "data-toggle", "collapse");
    			attr_dev(button, "data-target", "#navbarCollapse");
    			attr_dev(button, "aria-controls", "navbarCollapse");
    			attr_dev(button, "aria-expanded", "false");
    			attr_dev(button, "aria-label", "Toggle navigation");
    			add_location(button, file$4, 13, 4, 443);
    			attr_dev(a1, "class", "nav-link");
    			attr_dev(a1, "href", "#");
    			add_location(a1, file$4, 22, 4, 964);
    			attr_dev(li0, "class", "nav-item active");
    			attr_dev(li0, "data-toggle", "collapse");
    			attr_dev(li0, "data-target", ".navbar-collapse.show");
    			add_location(li0, file$4, 21, 5, 871);
    			attr_dev(a2, "class", "nav-link");
    			attr_dev(a2, "href", "#");
    			add_location(a2, file$4, 27, 4, 1190);
    			attr_dev(li1, "class", "nav-item");
    			attr_dev(li1, "data-toggle", "collapse");
    			attr_dev(li1, "data-target", ".navbar-collapse.show");
    			add_location(li1, file$4, 26, 5, 1104);
    			attr_dev(ul, "class", "navbar-nav mr-auto");
    			add_location(ul, file$4, 18, 3, 790);
    			attr_dev(div0, "class", "collapse navbar-collapse");
    			attr_dev(div0, "id", "navbarCollapse");
    			add_location(div0, file$4, 16, 4, 692);
    			attr_dev(div1, "class", "container");
    			add_location(div1, file$4, 11, 2, 359);
    			attr_dev(nav, "class", "navbar fixed-top navbar-expand-md navbar-light bg-light");
    			add_location(nav, file$4, 10, 1, 286);
    			attr_dev(main, "class", "svelte-1tky8bj");
    			add_location(main, file$4, 8, 0, 275);
    		},
    		l: function claim(nodes) {
    			throw new Error_1$1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, nav);
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
    			append_dev(main, t6);
    			mount_component(error, main, null);
    			append_dev(main, t7);
    			if_blocks[current_block_type_index].m(main, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(a1, "click", /*click_handler*/ ctx[1], false, false, false),
    					listen_dev(a2, "click", /*click_handler_1*/ ctx[2], false, false, false)
    				];

    				mounted = true;
    			}
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
    			transition_in(error.$$.fragment, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(error.$$.fragment, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(error);
    			if_blocks[current_block_type_index].d();
    			mounted = false;
    			run_all(dispose);
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
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("App", slots, []);
    	let showSettings = false;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => $$invalidate(0, showSettings = false);
    	const click_handler_1 = () => $$invalidate(0, showSettings = true);

    	$$self.$capture_state = () => ({
    		showSettings,
    		AppInsightsConfig,
    		AppInsightsQuery,
    		AppInsightsResults,
    		Error: Error$1
    	});

    	$$self.$inject_state = $$props => {
    		if ("showSettings" in $$props) $$invalidate(0, showSettings = $$props.showSettings);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [showSettings, click_handler, click_handler_1];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		if (!document.getElementById("svelte-1tky8bj-style")) add_css();
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$4.name
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
