/*!
 * jQuery JavaScript Library v1.9.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2012 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-2-4
 */
(function( window, undefined ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//"use strict";
var
	// The deferred used on DOM ready
	readyList,

	// A central reference to the root jQuery(document)
	rootjQuery,

	// Support: IE<9
	// For `typeof node.method` instead of `node.method !== undefined`
	core_strundefined = typeof undefined,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,
	location = window.location,

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$,

	// [[Class]] -> type pairs
	class2type = {},

	// List of deleted data cache ids, so we can reuse them
	core_deletedIds = [],

	core_version = "1.9.1",

	// Save a reference to some core methods
	core_concat = core_deletedIds.concat,
	core_push = core_deletedIds.push,
	core_slice = core_deletedIds.slice,
	core_indexOf = core_deletedIds.indexOf,
	core_toString = class2type.toString,
	core_hasOwn = class2type.hasOwnProperty,
	core_trim = core_version.trim,

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context, rootjQuery );
	},

	// Used for matching numbers
	core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,

	// Used for splitting on whitespace
	core_rnotwhite = /\S+/g,

	// Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	// Match a standalone tag
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

	// JSON RegExp
	rvalidchars = /^[\],:{}\s]*$/,
	rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
	rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
	rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	},

	// The ready event handler
	completed = function( event ) {

		// readyState === "complete" is good enough for us to call the dom ready in oldIE
		if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
			detach();
			jQuery.ready();
		}
	},
	// Clean-up method for dom ready events
	detach = function() {
		if ( document.addEventListener ) {
			document.removeEventListener( "DOMContentLoaded", completed, false );
			window.removeEventListener( "load", completed, false );

		} else {
			document.detachEvent( "onreadystatechange", completed );
			window.detachEvent( "onload", completed );
		}
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: core_version,

	constructor: jQuery,
	init: function( selector, context, rootjQuery ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	},

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	// The number of elements contained in the matched element set
	size: function() {
		return this.length;
	},

	toArray: function() {
		return core_slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num == null ?

			// Return a 'clean' array
			this.toArray() :

			// Return just the object
			( num < 0 ? this[ this.length + num ] : this[ num ] );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	ready: function( fn ) {
		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	},

	slice: function() {
		return this.pushStack( core_slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: core_push,
	sort: [].sort,
	splice: [].splice
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	noConflict: function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	},

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.trigger ) {
			jQuery( document ).trigger("ready").off("ready");
		}
	},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		return !isNaN( parseFloat(obj) ) && isFinite( obj );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return String( obj );
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ core_toString.call(obj) ] || "object" :
			typeof obj;
	},

	isPlainObject: function( obj ) {
		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!core_hasOwn.call(obj, "constructor") &&
				!core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.

		var key;
		for ( key in obj ) {}

		return key === undefined || core_hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	error: function( msg ) {
		throw new Error( msg );
	},

	// data: string of html
	// context (optional): If specified, the fragment will be created in this context, defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	parseHTML: function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
		context = context || document;

		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];

		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[1] ) ];
		}

		parsed = jQuery.buildFragment( [ data ], context, scripts );
		if ( scripts ) {
			jQuery( scripts ).remove();
		}
		return jQuery.merge( [], parsed.childNodes );
	},

	parseJSON: function( data ) {
		// Attempt to parse using the native JSON parser first
		if ( window.JSON && window.JSON.parse ) {
			return window.JSON.parse( data );
		}

		if ( data === null ) {
			return data;
		}

		if ( typeof data === "string" ) {

			// Make sure leading/trailing whitespace is removed (IE can't handle it)
			data = jQuery.trim( data );

			if ( data ) {
				// Make sure the incoming data is actual JSON
				// Logic borrowed from http://json.org/json2.js
				if ( rvalidchars.test( data.replace( rvalidescape, "@" )
					.replace( rvalidtokens, "]" )
					.replace( rvalidbraces, "")) ) {

					return ( new Function( "return " + data ) )();
				}
			}
		}

		jQuery.error( "Invalid JSON: " + data );
	},

	// Cross-browser xml parsing
	parseXML: function( data ) {
		var xml, tmp;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		try {
			if ( window.DOMParser ) { // Standard
				tmp = new DOMParser();
				xml = tmp.parseFromString( data , "text/xml" );
			} else { // IE
				xml = new ActiveXObject( "Microsoft.XMLDOM" );
				xml.async = "false";
				xml.loadXML( data );
			}
		} catch( e ) {
			xml = undefined;
		}
		if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	},

	noop: function() {},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Use native String.trim function wherever possible
	trim: core_trim && !core_trim.call("\uFEFF\xA0") ?
		function( text ) {
			return text == null ?
				"" :
				core_trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				core_push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( core_indexOf ) {
				return core_indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var l = second.length,
			i = first.length,
			j = 0;

		if ( typeof l === "number" ) {
			for ( ; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}
		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, inv ) {
		var retVal,
			ret = [],
			i = 0,
			length = elems.length;
		inv = !!inv;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );
			if ( inv !== retVal ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}
		}

		// Flatten any nested arrays
		return core_concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = core_slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( core_slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	access: function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			length = elems.length,
			bulk = key == null;

		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
			}

		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {
				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;

				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}

			if ( fn ) {
				for ( ; i < length; i++ ) {
					fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
				}
			}
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				length ? fn( elems[0], key ) : emptyGet;
	},

	now: function() {
		return ( new Date() ).getTime();
	}
});

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || type !== "function" &&
		( length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj );
}

// All jQuery objects should point back to these
rootjQuery = jQuery(document);
// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( core_rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				args = args || [];
				args = [ context, args.slice ? args.slice() : args ];
				if ( list && ( !fired || stack ) ) {
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};
jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var action = tuple[ 0 ],
								fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ action + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = core_slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? core_slice.call( arguments ) : value;
					if( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});
jQuery.support = (function() {

	var support, all, a,
		input, select, fragment,
		opt, eventName, isSupported, i,
		div = document.createElement("div");

	// Setup
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// Support tests won't run in some limited or non-browser environments
	all = div.getElementsByTagName("*");
	a = div.getElementsByTagName("a")[ 0 ];
	if ( !all || !a || !all.length ) {
		return {};
	}

	// First batch of tests
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px;float:left;opacity:.5";
	support = {
		// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
		getSetAttribute: div.className !== "t",

		// IE strips leading whitespace when .innerHTML is used
		leadingWhitespace: div.firstChild.nodeType === 3,

		// Make sure that tbody elements aren't automatically inserted
		// IE will insert them into empty tables
		tbody: !div.getElementsByTagName("tbody").length,

		// Make sure that link elements get serialized correctly by innerHTML
		// This requires a wrapper element in IE
		htmlSerialize: !!div.getElementsByTagName("link").length,

		// Get the style information from getAttribute
		// (IE uses .cssText instead)
		style: /top/.test( a.getAttribute("style") ),

		// Make sure that URLs aren't manipulated
		// (IE normalizes it by default)
		hrefNormalized: a.getAttribute("href") === "/a",

		// Make sure that element opacity exists
		// (IE uses filter instead)
		// Use a regex to work around a WebKit issue. See #5145
		opacity: /^0.5/.test( a.style.opacity ),

		// Verify style float existence
		// (IE uses styleFloat instead of cssFloat)
		cssFloat: !!a.style.cssFloat,

		// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
		checkOn: !!input.value,

		// Make sure that a selected-by-default option has a working selected property.
		// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
		optSelected: opt.selected,

		// Tests for enctype support on a form (#6743)
		enctype: !!document.createElement("form").enctype,

		// Makes sure cloning an html5 element does not cause problems
		// Where outerHTML is undefined, this still works
		html5Clone: document.createElement("nav").cloneNode( true ).outerHTML !== "<:nav></:nav>",

		// jQuery.support.boxModel DEPRECATED in 1.8 since we don't support Quirks Mode
		boxModel: document.compatMode === "CSS1Compat",

		// Will be defined later
		deleteExpando: true,
		noCloneEvent: true,
		inlineBlockNeedsLayout: false,
		shrinkWrapBlocks: false,
		reliableMarginRight: true,
		boxSizingReliable: true,
		pixelPosition: false
	};

	// Make sure checked status is properly cloned
	input.checked = true;
	support.noCloneChecked = input.cloneNode( true ).checked;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<9
	try {
		delete div.test;
	} catch( e ) {
		support.deleteExpando = false;
	}

	// Check if we can trust getAttribute("value")
	input = document.createElement("input");
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";

	// #11217 - WebKit loses check when the name is after the checked attribute
	input.setAttribute( "checked", "t" );
	input.setAttribute( "name", "t" );

	fragment = document.createDocumentFragment();
	fragment.appendChild( input );

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	support.appendChecked = input.checked;

	// WebKit doesn't clone checked state correctly in fragments
	support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Support: IE<9 (lack submit/change bubble), Firefox 17+ (lack focusin event)
	// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP), test/csp.php
	for ( i in { submit: true, change: true, focusin: true }) {
		div.setAttribute( eventName = "on" + i, "t" );

		support[ i + "Bubbles" ] = eventName in window || div.attributes[ eventName ].expando === false;
	}

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Run tests that need a body at doc ready
	jQuery(function() {
		var container, marginDiv, tds,
			divReset = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
			body = document.getElementsByTagName("body")[0];

		if ( !body ) {
			// Return for frameset docs that don't have a body
			return;
		}

		container = document.createElement("div");
		container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

		body.appendChild( container ).appendChild( div );

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		tds = div.getElementsByTagName("td");
		tds[ 0 ].style.cssText = "padding:0;margin:0;border:0;display:none";
		isSupported = ( tds[ 0 ].offsetHeight === 0 );

		tds[ 0 ].style.display = "";
		tds[ 1 ].style.display = "none";

		// Support: IE8
		// Check if empty table cells still have offsetWidth/Height
		support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );

		// Check box-sizing and margin behavior
		div.innerHTML = "";
		div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
		support.boxSizing = ( div.offsetWidth === 4 );
		support.doesNotIncludeMarginInBodyOffset = ( body.offsetTop !== 1 );

		// Use window.getComputedStyle because jsdom on node.js will break without it.
		if ( window.getComputedStyle ) {
			support.pixelPosition = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			support.boxSizingReliable = ( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. (#3333)
			// Fails in WebKit before Feb 2011 nightlies
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			marginDiv = div.appendChild( document.createElement("div") );
			marginDiv.style.cssText = div.style.cssText = divReset;
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";

			support.reliableMarginRight =
				!parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );
		}

		if ( typeof div.style.zoom !== core_strundefined ) {
			// Support: IE<8
			// Check if natively block-level elements act like inline-block
			// elements when setting their display to 'inline' and giving
			// them layout
			div.innerHTML = "";
			div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1";
			support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 );

			// Support: IE6
			// Check if elements with layout shrink-wrap their children
			div.style.display = "block";
			div.innerHTML = "<div></div>";
			div.firstChild.style.width = "5px";
			support.shrinkWrapBlocks = ( div.offsetWidth !== 3 );

			if ( support.inlineBlockNeedsLayout ) {
				// Prevent IE 6 from affecting layout for positioned elements #11048
				// Prevent IE from shrinking the body in IE 7 mode #12869
				// Support: IE<8
				body.style.zoom = 1;
			}
		}

		body.removeChild( container );

		// Null elements to avoid leaks in IE
		container = div = tds = marginDiv = null;
	});

	// Null elements to avoid leaks in IE
	all = select = fragment = opt = a = input = null;

	return support;
})();

var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
	rmultiDash = /([A-Z])/g;

function internalData( elem, name, data, pvt /* Internal Use Only */ ){
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, ret,
		internalKey = jQuery.expando,
		getByName = typeof name === "string",

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && getByName && data === undefined ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			elem[ internalKey ] = id = core_deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		cache[ id ] = {};

		// Avoids exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		if ( !isNode ) {
			cache[ id ].toJSON = jQuery.noop;
		}
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( getByName ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var i, l, thisCache,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			for ( i = 0, l = name.length; i < l; i++ ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( !( pvt ? isEmptyDataObject : jQuery.isEmptyObject )( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	} else if ( jQuery.support.deleteExpando || cache != cache.window ) {
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// Unique for each copy of jQuery on the page
	// Non-digits removed to match rinlinejQuery
	expando: "jQuery" + ( core_version + Math.random() ).replace( /\D/g, "" ),

	// The following elements throw uncatchable exceptions if you
	// attempt to add expando properties to them.
	noData: {
		"embed": true,
		// Ban all objects except for Flash (which handle expandos)
		"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
		"applet": true
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	},

	// A method for determining if a DOM node can handle the data expando
	acceptData: function( elem ) {
		// Do not set data on non-element because it will not be cleared (#8335).
		if ( elem.nodeType && elem.nodeType !== 1 && elem.nodeType !== 9 ) {
			return false;
		}

		var noData = elem.nodeName && jQuery.noData[ elem.nodeName.toLowerCase() ];

		// nodes accept data unless otherwise specified; rejection can be conditional
		return !noData || noData !== true && elem.getAttribute("classid") === noData;
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var attrs, name,
			elem = this[0],
			i = 0,
			data = null;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					attrs = elem.attributes;
					for ( ; i < attrs.length; i++ ) {
						name = attrs[i].name;

						if ( !name.indexOf( "data-" ) ) {
							name = jQuery.camelCase( name.slice(5) );

							dataAttr( elem, name, data[ name ] );
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return jQuery.access( this, function( value ) {

			if ( value === undefined ) {
				// Try to fetch any internally stored data first
				return elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : null;
			}

			this.each(function() {
				jQuery.data( this, key, value );
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
						data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}
jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		hooks.cur = fn;
		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	delay: function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var nodeHook, boolHook,
	rclass = /[\t\r\n]/g,
	rreturn = /\r/g,
	rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i,
	rboolean = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = jQuery.support.getSetAttribute,
	getSetInput = jQuery.support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return jQuery.access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	},

	prop: function( name, value ) {
		return jQuery.access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	},

	addClass: function( value ) {
		var classes, elem, cur, clazz, j,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( core_rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}
					elem.className = jQuery.trim( cur );

				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( core_rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}
					elem.className = value ? jQuery.trim( cur ) : "";
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isBool = typeof stateVal === "boolean";

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					state = stateVal,
					classNames = value.match( core_rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					state = isBool ? state : !self.hasClass( className );
					self[ state ? "addClass" : "removeClass" ]( className );
				}

			// Toggle whole class name
			} else if ( type === core_strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	},

	val: function( value ) {
		var ret, hooks, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val,
				self = jQuery(this);

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, self.val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map(val, function ( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				// attributes.value is undefined in Blackberry 4.7 but
				// uses .value. See #6932
				var val = elem.attributes.value;
				return !val || val.specified ? elem.value : elem.text;
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var values = jQuery.makeArray( value );

				jQuery(elem).find("option").each(function() {
					this.selected = jQuery.inArray( jQuery(this).val(), values ) >= 0;
				});

				if ( !values.length ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	},

	attr: function( elem, name, value ) {
		var hooks, notxml, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === core_strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( notxml ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] || ( rboolean.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && notxml && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && notxml && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {

			// In IE9+, Flash objects don't have .getAttribute (#12945)
			// Support: IE9+
			if ( typeof elem.getAttribute !== core_strundefined ) {
				ret =  elem.getAttribute( name );
			}

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( core_rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( rboolean.test( name ) ) {
					// Set corresponding property to false for boolean attributes
					// Also clear defaultChecked/defaultSelected (if appropriate) for IE<8
					if ( !getSetAttribute && ruseDefault.test( name ) ) {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					} else {
						elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	propFix: {
		tabindex: "tabIndex",
		readonly: "readOnly",
		"for": "htmlFor",
		"class": "className",
		maxlength: "maxLength",
		cellspacing: "cellSpacing",
		cellpadding: "cellPadding",
		rowspan: "rowSpan",
		colspan: "colSpan",
		usemap: "useMap",
		frameborder: "frameBorder",
		contenteditable: "contentEditable"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				return ( elem[ name ] = value );
			}

		} else {
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
				return ret;

			} else {
				return elem[ name ];
			}
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				var attributeNode = elem.getAttributeNode("tabindex");

				return attributeNode && attributeNode.specified ?
					parseInt( attributeNode.value, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						undefined;
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	get: function( elem, name ) {
		var
			// Use .prop to determine if this attribute is understood as boolean
			prop = jQuery.prop( elem, name ),

			// Fetch it accordingly
			attr = typeof prop === "boolean" && elem.getAttribute( name ),
			detail = typeof prop === "boolean" ?

				getSetInput && getSetAttribute ?
					attr != null :
					// oldIE fabricates an empty string for missing boolean attributes
					// and conflates checked/selected into attroperties
					ruseDefault.test( name ) ?
						elem[ jQuery.camelCase( "default-" + name ) ] :
						!!attr :

				// fetch an attribute node for properties not recognized as boolean
				elem.getAttributeNode( name );

		return detail && detail.value !== false ?
			name.toLowerCase() :
			undefined;
	},
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// fix oldIE value attroperty
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			return jQuery.nodeName( elem, "input" ) ?

				// Ignore the value *property* by using defaultValue
				elem.defaultValue :

				ret && ret.specified ? ret.value : undefined;
		},
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			return ret && ( name === "id" || name === "name" || name === "coords" ? ret.value !== "" : ret.specified ) ?
				ret.value :
				undefined;
		},
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			return name === "value" || value === elem.getAttribute( name ) ?
				value :
				undefined;
		}
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		get: nodeHook.get,
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		});
	});
}


// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !jQuery.support.hrefNormalized ) {
	jQuery.each([ "href", "src", "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			get: function( elem ) {
				var ret = elem.getAttribute( name, 2 );
				return ret == null ? undefined : ret;
			}
		});
	});

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

if ( !jQuery.support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}

// Safari mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !jQuery.support.optSelected ) {
	jQuery.propHooks.selected = jQuery.extend( jQuery.propHooks.selected, {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	});
}

// IE6/7 call enctype encoding
if ( !jQuery.support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}

// Radios and checkboxes getter/setter
if ( !jQuery.support.checkOn ) {
	jQuery.each([ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			get: function( elem ) {
				// Handle the case where in Webkit "" is returned instead of "on" if a value isn't specified
				return elem.getAttribute("value") === null ? "on" : elem.value;
			}
		};
	});
}
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = jQuery.extend( jQuery.valHooks[ this ], {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	});
});
var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== core_strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		// jQuery(...).bind("mouseover mouseout", fn);
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = core_hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = core_hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		event.isTrigger = true;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && jQuery.acceptData( cur ) && handle.apply && handle.apply( cur, data ) === false ) {
				event.preventDefault();
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( elem.ownerDocument, data ) === false) &&
				!(type === "click" && jQuery.nodeName( elem, "a" )) && jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = core_slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur != this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			}
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== document.activeElement && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === document.activeElement && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Even when returnValue equals to undefined Firefox will still show alert
				if ( event.result !== undefined ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{ type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === core_strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = ( src.defaultPrevented || src.returnValue === false ||
			src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !jQuery.support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !jQuery.support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !jQuery.support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler while someone wants focusin/focusout
		var attaches = 0,
			handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				if ( attaches++ === 0 ) {
					document.addEventListener( orig, handler, true );
				}
			},
			teardown: function() {
				if ( --attaches === 0 ) {
					document.removeEventListener( orig, handler, true );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});
/*!
 * Sizzle CSS Selector Engine
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://sizzlejs.com/
 */
(function( window, undefined ) {

var i,
	cachedruns,
	Expr,
	getText,
	isXML,
	compile,
	hasDuplicate,
	outermostContext,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsXML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,
	sortOrder,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	support = {},
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Array methods
	arr = [],
	pop = arr.pop,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},


	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	operators = "([*^$|!~]?=)",
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	// Prefer arguments quoted,
	//   then not containing pseudos/brackets,
	//   then attribute selectors/non-parenthetical expressions,
	//   then anything else
	// These preferences are here to reduce the number of selectors
	//   needing tokenize in the PSEUDO preFilter
	pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*" ),
	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"NAME": new RegExp( "^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rsibling = /[\x20\t\r\n\f]*[+~]/,

	rnative = /^[^{]+\{\s*\[native code/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rescape = /'|\\/g,
	rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,
	funescape = function( _, escaped ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		return high !== high ?
			escaped :
			// BMP codepoint
			high < 0 ?
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Use a stripped-down slice if we can't use a native one
try {
	slice.call( preferredDoc.documentElement.childNodes, 0 )[0].nodeType;
} catch ( e ) {
	slice = function( i ) {
		var elem,
			results = [];
		while ( (elem = this[i++]) ) {
			results.push( elem );
		}
		return results;
	};
}

/**
 * For feature detection
 * @param {Function} fn The function to test for native support
 */
function isNative( fn ) {
	return rnative.test( fn + "" );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var cache,
		keys = [];

	return (cache = function( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key += " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key ] = value);
	});
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return fn( div );
	} catch (e) {
		return false;
	} finally {
		// release memory in IE
		div = null;
	}
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( !documentIsXML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, slice.call(context.getElementsByTagName( selector ), 0) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getByClassName && context.getElementsByClassName ) {
				push.apply( results, slice.call(context.getElementsByClassName( m ), 0) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && !rbuggyQSA.test(selector) ) {
			old = true;
			nid = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && context.parentNode || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results, slice.call( newContext.querySelectorAll(
						newSelector
					), 0 ) );
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Detect xml
 * @param {Element|Object} elem An element or a document
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsXML = isXML( doc );

	// Check if getElementsByTagName("*") returns only elements
	support.tagNameNoComments = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if attributes should be retrieved by attribute nodes
	support.attributes = assert(function( div ) {
		div.innerHTML = "<select></select>";
		var type = typeof div.lastChild.getAttribute("multiple");
		// IE8 returns a string for some attributes even when not present
		return type !== "boolean" && type !== "string";
	});

	// Check if getElementsByClassName can be trusted
	support.getByClassName = assert(function( div ) {
		// Opera can't find a second classname (in 9.6)
		div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
		if ( !div.getElementsByClassName || !div.getElementsByClassName("e").length ) {
			return false;
		}

		// Safari 3.2 caches class attributes and doesn't catch changes
		div.lastChild.className = "e";
		return div.getElementsByClassName("e").length === 2;
	});

	// Check if getElementById returns elements by name
	// Check if getElementsByName privileges form controls or returns elements by ID
	support.getByName = assert(function( div ) {
		// Inject content
		div.id = expando + 0;
		div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>";
		docElem.insertBefore( div, docElem.firstChild );

		// Test
		var pass = doc.getElementsByName &&
			// buggy browsers will return fewer than the correct 2
			doc.getElementsByName( expando ).length === 2 +
			// buggy browsers will return more than the correct 0
			doc.getElementsByName( expando + 0 ).length;
		support.getIdNotName = !doc.getElementById( expando );

		// Cleanup
		docElem.removeChild( div );

		return pass;
	});

	// IE6/7 return modified attributes
	Expr.attrHandle = assert(function( div ) {
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild && typeof div.firstChild.getAttribute !== strundefined &&
			div.firstChild.getAttribute("href") === "#";
	}) ?
		{} :
		{
			"href": function( elem ) {
				return elem.getAttribute( "href", 2 );
			},
			"type": function( elem ) {
				return elem.getAttribute("type");
			}
		};

	// ID find and filter
	if ( support.getIdNotName ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && !documentIsXML ) {
				�(q�ERX�| ��q>��}���	�K;0jW����7�gpB�dB�c2s�s�X�p|�)%A���j܌�G�QS���$�L(�'��n� V=�O��ԛ_��e@�3
�DB(��\s+�ϛ/@Z�F���׀?��H�� /vt��|{̝~g�yIt7hpZ/�r%��m�	�| �He����
m�����1D�l$�h�6S�	��!@6�S��bɩ?ӄ���	'�J�/^���L�菌}~/��-��L�kc(U@cHKq�憭�$��ARB��s�D^����;�i,�ʅ�YW�]��Q\�}'��ʣw����A6���"�7�p=����ʦ���&�mj(	�72C�L7B�	}<��~���I9�b.ߢܥ3lB����-"���(��v������0��ΐ�+�'�
�q�u�O�Y#��~�+ΰ�,X�����	�`�)� ���͖�6�������N����4H g來�Z��[(Q���a�>�Z^ ���}�*qI���^�s)p�)�,�kW�ebDL�Ս���o��
jZ �]~�T���M����r�_׍��K�|�y�z�ԋ�B=<�(���Ii�M���5BL�P�`��
"bA[�bD\rg��[U$�C�>!޹�v���Jv끯�����ӕ�ŘZ?}���C����Z툴�N� �1�[�`v;ҪU\�i�Q�Caii�
����X�b}>��W�s, \�բ��,}���9w�d�����F*L:�a�	[�5���{L����+0
��~�^p ��=����(=S�,%��]�K��Qc�f��˾Ա�G��C���o	^O��a~�)��X,�-Dh⽈׹
�x��7���f��`�G5-�[=ZClo�z�Z���~(�|�o�Mo�����b��sYD�y�3���l��A���@�%ƈ�򪼹a1��K<p��B�nH�d��]P,���eُ���������ྛ �
��
����Y(��f,S6��NLpUcl�b�'B&����1��V����.���
��
hTZs6�+*��gs�,K��ZʅۉY��
b��_=�0Eoi�V8T�����z��
�#ז��O�־ÛrF�׵���@`�{RǨ[��q��FMt�hd_sW���TP�OBT�&�s|��A��j�q$u���� ��_���G�(��>����_�S>}�7v��|������Af)�������e}�*J�4ٓ��O4t�+��д���ӦW���|kk�����ߏL���j�?6O�;���J kP�!�D�n%)�'��$
���x��7��`؀n�C����*}4WF�v��6OF�y�1����
A�?�n�].�3韝kA<�%�H�~��s��c��o�i�����Af$�Ā� ��WF � ��I��C	lXKu�56�����W��QC�[��SQ{�͸8�ie�#ndt[v�X��ӛ �I����!��U�-���r7����z�W��v2Oka�Q�'A劽-�vM�ܡF4v<>XԘ
�m�
�!`�����@b���H�w�nl�taĸϷ��v%@�w5�t�r;�ؽα���+����Y����&����8qt�X�>=�տ�鈙�[g���6P���e�>e����F{fʦa�h�\�t������7��JL�Ee�j�XgC~����<s(�� �6�
�5]��bV`�)<7m�z�W�g_g��?�lY6t��|VF�U>�l� `W"�i]?G�y+i�k���K�����c,��Ӥ@-�1d�}ߵe��;^.�[/��C�"�pR�ҥ:$�$���#]BU�����'Ԣ�aN�b�A�f��$�'��!������IIfGL�]�]��Q}���tVn���Զ��	�	L�v�V�?���v�^���7 ��Hg *G&���s42�O��$#�C�ǁ������gt'��T��M̠�y�GB��E��s�2�4|J�W��8�"���G̓���$˷�;�W������s���]cԯ>�~��0�-a'%���,A	wz�����b)��d����f����u��7�F)����-��A�I��n@�*���=9Ɍ�!�CJ�&����\���ݶ�2B��2�H�U����տUP�7z��|�С0B7&���薁��l�G���*�Y����D��'0����)ˆ {JR_�.^[���X�ouF�K�0��̞��?��kį}O�җ�;%H�Af�4�+����c��۔�N�C�� ��E�
ݑ+�'�lqA�S%�I�qV��.�.}�i�_�&����`ӂ�񑼕*���r'�q��_И5�-_����g�e�m���0%bwQ�[f�6�Y�%H���G_�}�ɹշ��`��2�P���Z��C����>�� �Sh�ݥ���g W�{ًIe�>
C�n�(�p����Iɪ��dex#B�@E��!�������[��}Z�Ö�F{���;t��:`����؜��5�V�K�E�	�n������L���Y���?��uӝ>Kez8W�
 _v�c�Q��S�m��vO�Q���%�����L�l�
�r��B��|ox�	X�G�l3ä�x�^Zr�ѯ���m��6氪��?=��\��:G_wq�!��]RʒZq��nd�j ����b��l�� ����`s��~U2Cң�y���qϊ��N�*K(?�}L
�7D�C,�ՓT���&��K��V{����"���+�����yCNg��MTS\4\d-M^�+tPF�!�[2I������������8@2Q�&;�v��q/���p�A��y����R��<[i~�v��T� �S��/�(��k�5(n	�\V���zn�#1E�)Y�7�E�r{��L^���fz��2��Ԥ�g)(��Q��
x+�a����7;���j
Cj�RW��-W�si<��]�����G�l�t�p50Y����ʅw�~3d_�So��q`�j��%�ɇ��f:CmZ5�,��/k�aKpP^*�����1�Qh�$ɶ�gx�GYNw$���v��o����"�N۠�U�+��[|��>������)65�+���M�΀�ͼ�Y*���}������) ���쮶gS�!�ԁ� � pWȵ�\�*�V�+�6
5y�j���w�=EcĈNS��?ΟTj����zLV`1B����k��dE̺���-'�-�?�I�_a9�=�C퇦�-;� u Z'-�b^�p�n:
�ݻ��xe�W���d=�&��d�@�� &��y�o�ά��rJ+8�r����~z��w�J���A��6��BT4��1��(j�]�ҴT�i��]E��x��TՐ>uA̖k����A�vJ��S�X���Ӧ\*48�K"A\�3�+��D���k
�#���1�7���?o�)�/�3�ǉ0G�o���D4���*�C��핟��o�ί���`��t�ץ'��|h����������/4���xt�7�� 	:e���%%C�h�FQ��煠O��MD��o�ӏ�^GL�h�=�q����r��u�qmo�fx�����ѠYo�A���C� ���xv�D#���^�Ӏ�u��QJ�{uW����N{��FU� n_k3tV�$=&;!˅xN�U/�=����	S~bhſ��L�b�\�p��bn`�3�&v�>��L��L��A���p߅�e�'�e�_��a� 1U���,�`�f��{L�h���n�R�}K?��h��TL���`!ׄ9���>q�,��Q��J��������:��<?�3�/2��Sx�?E��O8F\!��(Q�4�Ѫ���ŉ 	�S��}��(*�H^M=3t�D`��Cdc̋r���t�D�7��;:,�xWo�HExAT�qI�a�����{x����������Ņ_*� ���ԕ��c;�`<t5�F���j�]:H�'����� ���2��T�%�O4A�QίG�aN��
Y57@&[�3B��W'�
c��w-qo�Z;ŷ�ρ����i1=6���q��[[R��i}��~[2�ա��R��8�4H|�����S���)���~t�V���9p�6" is�z�
vB��T�+��^t�M�Q��s+[
ԫ1���[�V����P|i�c�s� ����'T�� ��r�);u_���M ����7`�e�7�������;p���P�/��x���GJE�5�}���,+�-�V��#D@�}�O�Y����駋юt���7�"�%�AO�=��g�m�T����֤���5�������?�I,�K�QX M�R���q�8�� W�~Z�hr�1���_͵;c5=�g~r +$i�S�z!��;#�X�N`��c3���r2��W���(��Af4e�r7z�����10\	��3��94�Ȩk[d��{�gJ�˴T���H�t���(�q�l|���S�=���W�[t1r\�u�z�4����i�������
�Č)Ȱ��"#$��Ʈb�C��E�-G4��[o7��V 9�6�>��b�_�i��K�;�gٹz~����q�d��kx�*��:���S�:Ber��,���k݋�}#C�<�^r���O	DO����5Ab\o�@f<xg���J�yY�����2�\\:���}���1
�@L�������rV���?���)��
6���^� ҃�חk�V�(�
�������貏
(P�!�0w��"���8��������+�9{2u
�9GZ�5�˶�ܒ,j:�mesq�#!���)iݤ܆s1���qCR�o������E�V,�l�� �7���j�L��q�A͘	B�.0Xw+������&�3�����c+�@Yh��!�}���gb���1�'v��yd��K�������ϱK�r����Z��@�h�o���s���&��<��YǯL�.9��X�5��
���*@����q�텍/z�F�ÆK��f2��4�����`��.�'Yd!���-��w+�R��2�0�������e KSg�`���Ӫ�f2D|��
��{�q�l�^a�X�S�)9#^�|�>�?�g��D�ײ?� u�%�`�T)i1*�
#�>-�(9N�B�n�XiΣ�\��E�m|�����1�H kQ����ƸI���QQ�2�"A��z�����!�]��
�c�0�K ��#�v�$��)�6������P�9���:&k�5�/���JH3�|"[��ǔ"r(���C�,4���i�=�V�ٳ0��M?e'�{ M|�H�w�
m��ӓ5�K8Vm��
��$)��	4��\��냽|����R�Z���0��@���\
T�#R��)^�����đ���N[�k�{�ͱ�%�)����7<�3�W34�	P|��m{A�R$eP�֘TTg��7m���}hk�����w=Q��NF}�s7�yf�L���­�����z}ZX��3~L"�7�+\�����g&�
���n�	z֎�-�a|���n��\0��0�s��v�%�S�]^j��/ �
�e��B��s݀��`�����9*��@���X!�������)0E�i
�i#oIi=�Շ�:ҽ\�P��,
�%m?=_3%ڲp����dl@pJ�gO����s#�Yظ�R'��"H�������0���~)y0w�oͿ��������)���K�o:{��B�>Q��l*�C���#{	pӴZ��8�
�I��8�Y��C+=�`�Lv�T��1�2���;�F,ƹ[27��'�Z>��^��z�S��W��`b�V]�R�)�Zϲ)=P�����!VE���4�oHf����>��`t+�y��sK�7��(9#EgR��]���>����#(-Fo7���fv�3l*D)������:�����z��xg�׌�V���H���b�d�Y���7�H<�F�N�=�Ż3�|��K����.� �<"���h����ԇ�����2RI�DHC��TVr�� wz�GT���D�V�y�����I$,��G|��Dk<бg�f��I~^}��mV�����3�ʿρ��Q΍e�!i��K�Y���M�����v*�m3�%���+0;���Hz.��=�)�ӄ�z�!��aZw�����P%[?�{���������5j�!0�<r�_�V�R��R��fO��v#�%�)�L�L�7���4�5��k�������-NQ���P):����}9�9��6\ʝ����rH��D����ǟn�eRo������&%xb���Յ�f:X�%��_���*P�7��Dm�Q2WO\Ʈ#*�SW���
����-f(��a{��I�
�Sy{��4��F�ȷ��˓D�DL�O�7A,O3\}��M�ƚ��A�hY>�=���[�r+_|.���N�����<�.y�'�:2Jh���Ӎv�.���X?}��X�� �Q0?�A~���	�
�?E��K��9� tI8�HI�v�ĥ�V.��u�S:������=VJ�MA����&�
�_W�t8Xi�]dx��2��a�������g�I}�������誸	���ay �2aNu�8D����F��&�|0�z6�#n��Eg�y�y�+�6p �Er��CN�����}�Z[�0"��BE��/P�pTd1���l�A(����
'2E��0F̰s�!��L�ᶛ��g"�O�_��/���}4�8�-S=��f����ꋿ�cR�[.0$ݽ*��֐�J?\\H��	&�+�i�	̼OR�y}&�d!����1:�~��ǹ0#��kӆۢ���
�@"k��?4��"���x�sߞ�����u������B������B�%�h�.C�[��GMt����[ү�	�|hw��#�Q����xqd O�?נ_"��M.�<�
f�����F���P
邇�&+'�%�h[Ą�]�<��}5!�����?v>���2��M��`��ɔ��"��u!��(���~�u~q�ᾌk���Y�7���g�o�	�%,��[�"c���1�����	s�i�>�U5�en���q��ߞ胯=uɽ�.��L�66�,��Rb��DdD��dL�
�F��h�S6��N�X*đ�R�f�?�d��>��e�<��;p29U�����~?�a��6YHJ��r���Q��_����dMe��;�
���
�+���!�2�G��Tj\�{�0:�`h��p�D,��'Xqh�hU���x��>a���7��Y�U��s��mو����0��sZv��N.�F�ъ�tA�Ә�-em����Қr>�U�%�{
�T`s-�C�X@!B�W(��q;�vx����tf�^#4}`	��=@�ֻ���G|��=�&���ͥuH��L����xnE��ײ(��~�H;R>TԒ��~?`���$̌�,�L�.�Kf�G���3����1En��M�
m���qvy��vC�Y��}����3!���?f�M��0�'�]5�[o;��6uػ`Vc@�6�q���=3�0�^
��=s�(���ּ`I�4�F74�	�"6/O�u�ԤL����,q1���sM���Fv���S�QyV�s/�#���Y8 ˤ�b:)�k�m��B0Lݾ╿R	��?��x���RɄ��) Z	h���\�l �>��7_�s�p~	�
���S����	���w����0��؆�$�(s���g�V����<'q�rqٔ��A�-',��YɠhI,B$6��BM�����bOΆ���u�����P=_�
�V�*�>H�:JR��Ù���!�s����q�Lq=��X*-E{�"o��|�����!ZA���U������x䲔v�H����2�/��5j1�}|�n��_S ���O�pL��F���*�0 ��R�u����7�.�C��ѵ|C)_�$��71;���˺X�(%�[����ϰ��q��N�IO������t�r�"^�,ֳɤG�t?A�!��y8*��˵��$��
����Zf�ǥ6���n����L�|7���ү�
�<�5g9䧫q}Bi]�:f��x_��fD������p�U�O��=�>wH��I��[	���+o8]G����oҴ�FD�c�i`��5�@ߩ�� ����q:�W�R�9Z{yl!f0���m�IڼNh�fk���ϡ浈�$4�&z��7a�9�6b襻�53sy��O�'t����M�1߼����e�<��J�����������Ǽ%'�E1��M�`Õ����w�O\E/ųX����Ώ��}�n|{l�G�Ʋ��C�!�4��7�<{Kz�N�^M����s�<�W:�� �Z�)�0?�S�1P<�b�3�1|�$�X��
�쾑��cƬKڱ_c�ҞSaj�,UPO�� bLwHn�="�:�Y��?`��oiӓ����������0����W�4�w�o��â2a���C��6>w!�u��a�М  a�U��p�T�-IB��di�!��s��_a�_&�"pZO���̹P��}�R`ϕ����|弿m�|�	�����7�Y������a�d��o�U�UK�;�Wm*����M��z����>�jd���*d�z����n�nz�����n˫�x�.��f��c�����:���(h4P���J�Ι.(�C��O #�2�E�jx�羕����y��M\�����7N]&��xv�ՐӦZ���v�4m�/m�U�w�bމz�?�nM����.������ug�����S�dS�Rw:�Yl��쀛q�_���)k"�Ȧ�+��
/@*g!�Y�y�ᤤ��ܧV�kM�k����}t�P�3�      {!�������ji�-Z3w�wӋBV���w��^Ð�����Q�MŎ8PGyoyL>��Z+�}o���!�.��lY=W�����P�����c�,��^ye
��#�]�͈��`�ⰳ߸�X��2��7�u�Gp����\�C�~g�|���>F�f�:�f�U�h��g�f�M�gZ��e�Vf�ˀ�7����iE!P���l�*f�w�z�#U!��;�$!��6_���`������Ďa�:3R)�0������xQ�!^*x;����yzLf��t�:�����/zX
j�lb���C ;4�q�K;}յ��YK�>��UoAal���@�W=����l�P����u�t���R�����/� ��@         !����b�A(N�e[�f]�1'�\��:H����7<����>T���?q�v�������{�A�!�9��{�y�<����q�êQ���)~�]m�e6x�yM��Wn�뗉7w{{O��['ͨv���^'���M58Χ؟��
�n�^����~���>�����vӘ�{��Y�W�^�C�����M�ٓ2�2{��� �Y6��K3��&�
��S�V��Z&��P͐$�5)�1�*D�GC;-\�O7j�*z��
a�{����8�WqF�Rfž����(�m���Wi�E��ᮨ�'[�p.<.�*���Q���M��@��r�iN\�KV���Ş�5�Ox��u-Ә��i���%Dګ�#*ˣ�G7|����ϗ����r���U���|�@X�         �!�e��b�0h�#���Z�u�".�P#�$)�;T#���N�� (� ����I�j�i�>O�(� y��Z�y��p�_Ϣ��gզ��g�+K��;��=�+˝%��z��U���J�fK�IH���_^���G�|c#���}�f�ս�����'�uYp^'�����}�[z��z���C,5
q!���_��.�T����"_�EP��&�N��\�;**�힤��
��
j�zҕ:J��W�}��^>��R%�,�m�5�>WC�V��v��7�������kh�*3(�*�O�>����i�2ėgb[�1L��u� �o�-�\i#�<>7��� ��!�u���0`�_�XF�Z�RT�Ł	h&XyM ��>���hu+��P�n�������~�"�3�N�j�׸-ÑX���f�e�YW�p��7�d����<�n�ֻݬ�9��IQaEU�D{$��*x͒юk�VD�����q�UŚ��/����
ٌ/]գ-�}rٴ���ugϱ6�cкgԹ��V���t�wV����Y )V�ثϼة�W����Ni��e�<,ˇ�4gޛS�5�����`�6�ȷ�����e��Rs����PА�U����ͱ���#QN������HI�gDP024�goE��x���i	[M�*��� �8f�~W�fQ2v���Mn��+_����1zo��c�-
�c�/%;���l����]Z1Q�v9t�g��@X�     �!�}��a�� �
X��(�"J(�I!�"�nn���j�_q��.l��r��>M���L�GnW˻�0�VS�v
;�Y�&O ΢F�cY��#��Z�[edn��ˉ���QM1.�m���&}���v�OQ���>�� !����d��@A,��Qh�SW�I1 ��RҨ g�̓S�����G�9'��o;���\�C������
O�3:I��S��w%��1�
:�%v�^�T�ϻ�HMC�v��k�+}���n��`[6��]�:��c�]�ۜ@ګ�֬���4,��l��c
S�g��U+������������1��{ҟ/�����_r�
�cl�.诜�n]=��(,}�ޭ��d�+�lg��ēZ+@�[c��g�vAo��W��GSۣ�I
�\�ʝP�`��k��-��՗�G��q��[z-��[�z;u����_^��~)+-��kn�*���N��6t>]�O�{4���UU��ގ>�nؖ�*,��N�\�
��ϒ��9����Nj�ԭq/��}p��M ��o�c;�KMʭ.\�����ULP(5Ĕ�;��*�@�1h���SK��2��+�jXj�Y�-���.��h>�d�<��|R�Ԫ��Ffxs��_K� ���   !����a�0h�e����qY�%���Ē6��a#�e��nlqrY
�"��lW��=[}����f>�dS�t�0>Ӻr��Mƾi|�V4�������h�k�<�Ă�*��,	����0o��;��Z6{�Sh�����m�Ey��8���

�۲.rK�*A�=���ۇ[z����h���
���S#-tr�?��	�씝��1j�H��Ff1�!�٫֤�i�NU�K3�X�ՠ�tF��p\,����>�
G����� }c0     !��ʍb�0�n#.���D�U5�H/#`�B�c*��3��p�܊D�
�<�;����7�#�ql֥�3��ۿjȂ�Bc��W>�Ԥmu
cM��f�f<�#%�w��!�[�:nE�v�+����,S�f�ܻޡ���j���K��-�~j�d@�Tqrg �r���W��S3�z��£�+e�FG6EpS�2��2�c1�H�Csh/!(0�\�>��@�9u@�� ��/��'ooT����K��s�3WR��\1�ե��a��%Is�.��dr�|�s)����VJ�d�M$��"۳�
pﯸ�1$�/�)�r�7�e.x-�գ����S4ͱ�kSX��~�v�����dm`�j��0��9�:��C���(�!����b��@@�u�f�Vb^��T�
yD�H}"��yF:���զ��/'���_Թ����Lg9����s_�d:ބ�ĝ]��Le����l�2]�ۄ�x���r-��z�P՟S�������XV���ɘ�s���<��!���Ӗ2��������%rF��n��=P�eۼGmKU���C n��R���#ҫ)E2e5�˵lN�*�܆���{r��+����f�@��-X7Q(е��X��qΪ���K�[��~���\�T0�kЪ�W5=:z��1�U�ݕ�Cq@��4���(�)���fHxW}�ZR��Γa��_�+e��agj��f�g��������1I��V��G���h}� P�3�      q!����b���n"wЪ�82�w����ȴX��^{75�[�=��i�"�:N�=��]O��g�|�8��P��v7�o ΙSd=	���|���CG�c��/��v�u'O&u�h�ͻhA �I�T�{���E�̆�Yw]^s5���T\Svn�9�1��h���#n����9��	��0�8�B�ʘp˘�fm,,\�t�k'#�; ꊣ`�ĀK]g �MO'��0{ٻ\@��`��e��r�ev��̡3�[�.W'�%��n�$��Y_>:V�0����q-�@@�rL��q��9���� �1s!*4���|�%U$��+��U��y_�2n�5hVg��p!��ɚ��Fcm�j;)������O��v~ P�9!�e��b�С
 2
�^�U�dP�<*CS`���4�չ'%�ߦ"\�_`d�}�?S�A�?'��#�瞬h�,܆G�-�z�S�r�6���qo�Y��֠��nq+|Ul~�������p��`0ʽ��'j�k}Zq���Y���g�װߡ�����z`��#-��ˢ�oR��ڭ��ưG������D����l�r�9������r�� ��b#t�V��A?M��i誙~�C�iS@�Q&�k+~q��hA?Iױ�j�U����=�{wlc�k��K;��i\J�g���)Q�x	��I���j�(��GUSI�$G�����M�J�t�9��� [J�������!����U����5�� ���   !����a�B !m�Ar�uUw���U��)�i�N��#f{��ô�i1ޑا$�Ʀ�Rc������'�Zt6ߑ�B4c������
Wl��l�!������wй�O��7�ޫ������e*�:ц�;2��� 6�git���1��Z^�(�L8@
:���M���3���Z��e���I}L��Ԏ��,�v����~��(g��S0�in
 ��!�e��b����(���k}B�*�j�\$ȠG�.�8:$�V�Aʹ����x���gh��l5���|w��䞮�p���]F���E:��׬��gV����MM��蚆`^4���Q��Y�-��w���V��9�p��x��s�p������76�try���P�{�}+G�
m{��a4����3�w$�6�2Q,Hm�ZOm����\;���`�E����j��ZH�\�j	!흩��3G�nƞI6r�[���o��z~O�ʐ
 ��!�}��b��@@U�!��*)�ִJX`#���|�[W<��~#?�T�YǴ��^�z���y�{��U,�i|
�4��R�Ѿ�y�e�0ͬ��+�Tu��wƗ�z����[�T�ZN�d���O�_k�X̵�׽B�2T~a�|,�~���g_䪷�u�~ﯹǲ9���W��O)��D��n
h:�rFS%܊�ő�6=_��"�v�ٕ�ku��>|�����=�X�>l���9��&%v���NfL��*.22�9
a�Q�j1�4OYz��l�)Z�b	E�6H����E
���j���HNOd��`����{�|���W�e��� g�T����� o��c� }ch              !�\�_��
��ׄ0*%�g����[�eÒ��1r���̓�Po:�a�k��p  /
n�-ok>��?��mIq������B�p�@�0���C��bL@X���@�O�e�h�,�H���}��cX�S-�ڠų�_[�uq��i��K��_px�W�0`���'�3��r��j\�4�'m2�DH�Vnr����S�-�E5P���:4b̥;�]�z��:��l�2DDb���d�PL�6AT8,�W7�0U��,�W�+�[��[����E������فYlJ��݉��iA�q5T��[ϼN��@�<�>�$rـ;(�H$�q��Э�8�y���6��S�|�ʷ�a���w��TbF�[��ʟ*~�s넠���ONm׿���_p�����EW�Y��cYm,��`Dea^��lg�G�<T�����E��K��C���,V�+����&�  
�r�^�ܠ��i�J�أj�zE�/�� eiT0��ߋ����   3�,(� `��� ^X@�'45,z�L��c�Bwq��i ۦ6zk��#\FˇL��[�r�NlIq�)J,L��|�I���|V5ٹ��/��A���,�N�����"��e�/sH���P��l_;U� tG��}��;��	S��q�T, �J�u%�O}�1���l�s`��?#���|v�9�ފy}"t�Wb�Hj�~`^�s�l)_x��m��&T�.,E	7+
��g��o�����#�P��^_��w��N� ��vY����n����kk.� �&��nVEb7#����(+^��1opL���+�"f`g XA�   ��ȗ��m��8��:�+`٩����i&h�l@ ����,��,]$ٟ A�% � U�=��  �(��J�H�O2EZ������An�/�-r!������PD�t��&��	:����F��	X����>�����V V'&-(�0!�.��܈0;�~8Iz
<�W� u�*}�� �,���h��*7i�   ��ȷ�Jިq=��ְ�<l�S{��%L�2<* )�� �x/e8�f��|���x�����9�b�  �޽�L���;�F��(u$NUs�:�rrԆÀz�B�����h�7["\jJ$o�w��M]X�#�S�>��P���y��ٍ�V[�?��"��li��0�4i�_
� Y0���~=*ëu��Z��m�3�X�4i�_
��M�07h�:+h;�Ȩ�T�}�������!rbE6�=�|\����y���>��     !����b�P�t'r�Ir^L�]�T�T`�ya��XJ�Ro��,.!P
�u��ץy~�}WM�۞�K��=o�Э��Ӡ9m.�E���;,�����#Y?s����t����	�����N��Q�p��k\��τ�z��}fù�=ά&��s<k���ñ��Rn
���,���-�QK��!M�$3��E���Z����X)S6ٵ
�C�\�ruuv�*�%ņ����*=��k]/��
E�XL��8�Hkc�NEd܍�u7�TL�=W�u^���@X�           �!��҉c����%piY��Z"�s|d�
��;���>pW��_���`�4��O���;�S�W^�i�'9�&�հ.h���f���߸Sq ���9��Ѫ����
�q�.�W��p!.mc�O�+:,=�>�:Ŏ�һ�4���V=�⶙�Sg��??_�v���/��I�4�JZ�7G[R����\�Je���1�e�׋� �J�J2wX���7�t1Ϧ�f�}ꎖ<}����f�����Q�-z������N�R6�Y9ͦ��K�)���mci�?�'�^�+r
O�
#j%��(*���k���nAK]<�z��w�k��S�$��1���VN��QQ�E�����a"��8��������ݹI�S�G�6:�LD���?w�$�<��τ�L�����[l i ��{_;��)�0��Lw+2�2e�i�l5O*����2�d��;'�{����� P�?!����b���P7	UiT�,a�X����*S�C�5��(ӊ>��k��	\h��;?��>*��Mb�>=�.�^;b�s+5:5,o��4,�C���6=�d}3��J�]�Ùg��fN�s�G�Ivv;����Um[�sG#����x�u6E3����5٢����q ������d�	����IO4|�Zt��ߐz�8:��Q�(��;��j��x
<�a���T�rZmo?�'����|a;
�
vL�1�5�[խ���أ],�փv֍b��\6�o�e#?\^����ޫ�m��5�Z�m� 1K��M>��z����i�g�kg�<G�;Fd�wW<
W%Tk/���*�$߶ z:X�#�.�/%���A�*����筏N��,Kg��p��
� ��$d�42C� w7Brn��H)`ȼ&1�-U�g���w8���898��z��C������-X'�W�F�w��߹{c6��f�����V&�X��J�fd����d��4c��Ai��Ax�MFC'�F�0+*<�����Hڍ���]�mMy�pS�>(��ֲ�{+�y��� ��`  !�m��b��`��^��
�ޭWWP�|}�0�ML���Y���&s��Qa⟊���}1�|EJn�����/≴fzooQ�}�AYaP�l���t��@\��SVt#��3w]��
�\F�D��=v~H�zgg�P�d������x7���=
¬��=��iuՠU�����jU�_!��
$ ��T,�{	��������f�ς�jA��d�g3y��H��,JS��6�I�������R;4Q�q����c��v����\_/𠜌�QµN�^R�E�5ڤ9=
؞���i6��$�Y���\{4Ʌ��W)=%��;�_͖:?� �S�Y��.�����ޟ�g7�R����P��Nc��pu9=��m ��a �!��a���  ��5HT�^��E�8r���&�34_̈́H"�2h5�K��Ax������+f�>a~�$��<n}��-�]N)h��)�G��u�|�O �ʛiyF����P/|��?�b���s^1T�7����ŒR�m�8�p��%��1M��^N:˼��ʪ{�c���U<ҟRyʋ�V���9gZY�t&�{���B��x��C�V�e�ͨ�>�s��>�, �u�0?2\�F��8{~µjD�T��i�p�4��;k&�5�+YV<��2��k-f�@&vz6�y�xb���%G}�h�%ZuǗ��ѥ:��ʉQ&�A�m:VG&�W�6��ۈ-Z��	��Zq#{ӵ�e45H[pz�F��� P�2�    x!����d�A(NS.�_<]U��N.���l�L������F��޻�ʦ�����
�Y����,�:�JM�Zc��0�܊�!��%��̈YXr|]�i�y7#r�#�~�94�@�I���1����}�QI�g9�pk6ޣO0PC~���V��J�̕6�E��Srr�8�j��6e�Q�Ho��%m�}o��3+vl�Aj�2��I*��#�jSlL]��}~���p ��!�u��b��`�2#,4�dٮ��(�G��QYR���\���}�*@�����Vt;e͕�2�k5�nRY�Tc>��/]D|�T�u�zf�eֵ�_��R�Uu��n�ݏ��X����q�e�������|v�=V�Z��S�۶o<.߹���qNi�i������R���a���1��kg�5��2}8��
�������~]
�?���[��K��,*.Z�X;���4��� �OWWD�g��l!<M�?�������u.'�{~�G��?1ՍVX���,�
�QU �i�:��_�H8F��,;�2� ��7N���D��ȁd��MFh�Pl�)�u�*+�\���(�
��AҲ�@l�<�e:34�p Jޕ��r;������@X�  �!��ʍb�QT7�R�P/:bR���J(�"�Oݱ�g$3��ӵ��ni�b�Ue������s��j2�P�zK�q9x1v���!�A�V;�r
��%$���^����?�����B�K���^��g�nߥ���.:]nM����#�njj4�z�@|�z`!�z��1����+��cP��e<��r3ﷻ��_�4ߩ[��j%K�j�{����Ǌ��pxꙸ��I�V�Ϝ�vr�=�a0��=���jNV^�Q����اYZ��s3g�ܳ�������g	5X��`�
wZz��V�m�qy���Ӧ���	T�(���f�{G߫���׊N.��|�*Fs��{ǊS$�B߶�������H�w �n�/���ng�X/�v9(d��_Um[���31��|x��w� ��g       �!��Əb���nK�,��׭]%I2NAQ$�Y>M�A�.F��X���;����Q�X����4-�����4�<�������2�3v���-���i��+��q��g_���R�_��[f&g�:�ItOqx҄�Y=��B���3�s$5�'�;2�W�nx�:����30hM#ï�lW	n��e˛pL�R��z����k	�(E���
�Stn���vSC���h�z��Cx�?=�Ka��ht^x�Z�f�u B���'V6v�X���y	�9�_����QߤV]Jv��Tfo:{W�j��>��    !�uc��  T�\#{��bH�[;ދ�c&`�y�>[s]Kay-�J]�1���T��&�	�lr�?��̍�w�YU����x���=������\j��HZ���5r9S�C�qU��1V�{6x��P���6�7�E+bu||
��w^������W����KQ�c7����dƈS��\�'h�"!�̜U8㥷LëiC�v��f�̎z�%N��1k.<��
��IX)�6�}���`
@Wv��wv\��P�ϒx���o*)�U�}�)��͛�GC)�tbD�^ƥ�j��i\F��c]����'�� (��      8!����a�X�tH2����P�^�BJ0�x�Yl��il��;~�o�/��c��g�X�W��R:�2��~���%����=����ڦ�����G���L;Q���q�!�����R�Ù���2=?޴oZ�J�!��\��%����C@�>QOԳ���7[G��Orh)=i�:G���F����`�����+��̉�K�6ͧ*x�b�/YzLQ�Ζ5�1�ԣޚtd��	x���*�����3��R��	��e���s�i򇌁Ѱ��7����$�X�$DRJ,�B4f���0��3�V[)�ή�B�ÌT�L��G�I_o����x�"���u�\���6|�UwE��R���yyk�}� }c0     !�}��d`��Q��
�8�=����nQ��n*d���K֚�h�ig���+M�gt>�UFIVG���;�eE�����Q�T*�^;�l|�֢ǔۋ	9�#��ߗ�K���۳n"n�h.���b���~ܑ@e#�p�m�X·%3�Jj�b<rxF�m���*���vטe�e���M�tg�˴	Ro�ȗ�ui�;�S�������g���X�Y�a��'W���|�ĆUK��a��T��9+$�4ȍ��Sl�[;;�m'�z�9m^���:�c7{��E����V������g��_̴<ξ��>��    !����c��\ %�*-4�P��"�@��ER�_#{��G��U`���R������X�*}�,ԭ�!9�l��F�C��~w����r���|���g�{�ߐa�Yh�8>�b��$��O|-��KQ�j~�O�G�*���7����w�5=��vȆ:s��<�t��vok׿av��
�(V�⥏�*��.��ι���N�?���S�6�M�$S[���G]�������� ��j          �!�m��d�P�  a-6���ֈ�(�M�3�q�L�si���ĺ3�os�0����֠�����>�e�w�Y'v��w�G�eq�r�)��gV�/�/��]9�8|K��Ro��B� >��v�����`l�\�Ȝ
w��h��X��mbݖ��Z�6�S��ґms�+�KK3Q���u��"��U��X&����ŷ���������R���7�ܩ:��$1��E�糟TCBgF�Rܧ;kH��I2��r	�'���b��put)��-i�l�Yg¦8wZN�[Ѭ0��.s������:�>k����(�!�u��b�Сy�����IR�%��F�F4��m���2�:�d�>�+M�68	�-�8/�m�ʔ��+�2�K'\W��u�����9'��B-�F�5�#[�y�F�3t�,�69y��q!�2}���Mw��K����z���۸Ҵ�2؏�ϧ5�,E:�ok�.ZDݦcx��&|�6�Q�A���!�3$�#c��0%O(��㳕�#$��K�bBJ�����pǪ�+$d�ҡ^wv�$M�����'WGGQ�wwc6%�M�������k	�*;Y�M�VF�Z��ڻ\F\e�L ����-��qbPv�z-�6���Ž���;"�%j2t�G@������O�b捽�?��=���� P�2    w!����c`�`�*��7vӝ+2��H]ѫt �a�xT��7�a�?]�	:���� �M�m��C�P���r{�x�ǅ��51��>m_��f�K��q�v�zT1d��t��`��+�:c���~c�V�nG�3'��Q�X4/7I������7�0&�
'���?6q�pz�Η�q�w=~��e��&ਐ��m'In,G2s̓ �Wd���f�����`��y�4��x	̢��7�k-<�\Wq���c���Vڳ�>����B�=S���9�g������(��m�o��7���s��S�9Z��R*�Ȫ�6�yV���l�k�A���
 ��  !�}��a�ب����um�sK�$*6���f�T���=Ap�_tf��������ѱ|��:%2���mR9N/,{�����>��J��j��L��=Vr�ٝ�r��쐕,���#>	��Ix+
��p�ƨI�ǀ��ާ-GL.E����8���91bJ�Tn:aY���!��@�+²݉,��i&   �!�#_�@  #�s&  k^����5?�� �����?uL܇6��MJr�2��ީ�!3Nk�̢f����M�O@6P�u_�rX�,�9�Ȼ\�~Cd ��vϭ����^i�t�6B/6��y��h��JXd�,n�3/�����뼶�2o#i��@ȧ�V	`� �   '  ��   �!��"߇   ���ai`  '�����Bv�0���Q�"�=��t����w\~��J�\��L���DI�H��}�?���"�<�/V�c
~<�	/��9����B��u�O�;���]��9��|���'��1Gu�/���Ӻ��q�j�瞩

޺�K/�n���U�o��d7�c��n�=��z�����q�q>6枘im,C0�e錰��Y �d�Ԏ���!$�Jr�ydBsI��?Q�@.�	�6vv�jƃւ�m�.�`�5y��P�-]�c�
��_�W]J�b����T�r�)�[[��r��!U@P)�i�J�:����;T�YZ��V��M4�
�SǍ67kO#_���&݂��M����ҟ/��-_�TM
QJM�V��=G#�|����
 ��@   !����b�����/!&�T��MkY"J,^B ��S,m�T��O~h}w�޲F�v�C��S:�6om��ۚU�}a`��'�|�s	b��>;�xx����ڦ�hP�V�'��ڴR!�ײ�0��:����^
��3?�p�v�9��X��Ը������b�	��$� >�v�69�g��+���]*���g	��R���ٛ-X枈�_����T�!ս��o�*�.𣟐y�!��Q��]�����bE�O_o�������b��l���jGE�b�N}�q��$;��H7.%AT�z�&�(0\���l+����C���ͥ�ޙ�p�e��H�T�E�o鸼�XQ���iF�#�z{�@X�   �!����b��@G����ULh��42�k�O�c�x�.�mN	�7��/Ms]䭅�\�"O��߄Ҹ�N���m�3��;l�T���Xu8_L˷���k��Y~[bǮo�d�HZ./�lmN5&���|�J�f���O��(��x���+b��5V9Ѹ���x���-�6l�&�u�v������@0`e��g8X�ʓ#��Y��}-�TIVv;X�|�5S��}j�9�9�s�{�/�]u��i���٘r*k#�=�ƴ�NA-L�����km��>��W���UQk=y3��)��ɝR�J���Qh������u���A�ʼQ=:{�n��>7ӷ���3*۰m��aZ���!T����q�'�� ��c   �!����c�Pa��[ҭwEQ�� G���D�[U%q8������l�+\ʮ��|�sw�zo=���SQ��U���ʬ8�Vj ���&�Y�N�5h�����]jy-mHS���a%�F�3��4�]�k<���H_Z�Y�w�����^���9�+�y�D�a �|ޔ�=�毸��d\�Z�����$S�����ֺ�4�P��J�`��#r6/�:w}�>ep�<���r�� �j�Ω
V���uR���!ҽ!�0>�nK�J�ql�(I�;"S)�ȼ����d��g�+��a�^yV��(�4��i��gAS���l6ء�����'W&4��>��~OG��=��>��        !����a���AVܮ3�f�a$�R) ð��w�m�-7�{f�7;=���_o���l�8<�M�3G�rO��Ho�;}��뎏���g�)�$i���*�P�<gz�ׯzK[����S�<��\*��.
���k���n[�#Ϭjx�����v'o����+�;>�H�M��'ر�[Rź���[�DS�l#_�$���LBC���ߝo��������f���o���+>�����<�>��N�=�N/���
�Yq~�S^������B�aޫ��4ڲlj����<P��	�T��co,$[<���hf����n%Wmn��.��2�>~#�̕[+5�r6<篟.ˍ�ӡ���(�    =!����b��`�cJ���J�y�L%b��i`�M1�se{��An�tk]Z����Z�����F�k�j��Z������"�q�?3e�6�Y����!r�h�˭�j�{(�<�����<����\����|��C/��zW@�_�z�E�.'��j�,Y�7�MKl{F��M�����.�	t�"&�K1gX�D�U�»��c���$E��p��޹a�M�g�	��U���Ӧ���
�L��
aW����� ���-	�8	,8�y8�a�z�����
'�5������g��̸���|��
�=��+�6�f����檝��c<�z�{8�oX���f�M���p�5�[;Q�V���k�+�lT��J�u%E�3%���Ρ �l�t'Y(�^�k�|ߢ��&������ռ�*�pN���ƪ���
�vwB�>%J��i�_a<�E��:W�1}�+=�
���|7�z���\��s5���$������w���,�f&z�(o��a-�Um#I���E;�9��⑜���LG���tF���ϳ�;����`��Œ�����iYE%��9�
��I�zFu�I���a�F!l�����P�ۣȉc�k�X���:�.��l�^��N�:�y�*��g?���^>��'�_�_���d�}��4D���̋+����h�NnE&j�HOh6HX��x�~y���ambL<�]}Tl�I`�Y��Ʋ��q�|�EU�ѥ�;_F ��g       �!����b��� "�RT��U��b_^K��x�Z!�91�"EіX��s�}�OҿGv(���3���>�]��&5&`������m���4~����x[G3$'sJ����w��ˍf�&�Wbs]A���#���m�s�ЕC�c�9o�@�"�cc�0��<j8����1�䨪J��M�xz3a�`�71ҳ0O�՝�t�'&cR#h^[�j=����YP����9ԍ�o)���,r��s���(t�u��_�*�D���J�P6��O�n����,5��Ƕ^-��.ye��bG~
"I%���&4��lܽ��!1��Ue�V#������3���oC��tt�S�]�`��|�'������) ��f      �!����a�B !���f��H�_d�P#ɥ�5��s6���%���rFP�d�w�Lb����u��Ê�!�W����G���T��l޿����8��I��E��Z���^�fy-�ڄ�·��Ucdט�2�'Kac�:F�#,�7����T�60t��2>����j��z�=��5ԙ���*\�w<&�g@�=���2R�{\u��U\
�d��Ku���Dc���D�ޝI�M�)�E%�?�T�T܏�u��ҁM�2�/�e����4m��������~�.\�1���Ѥ��	@㪽
;b-&�����tS
z��ƛ/s��S�G���c�����2��N�)#�����#.۶�}��=��>��    !�u����  fp#.��_5�|B� �G¸R
5'���-s��z�x��&A�:��%�������ɺ��>��:�ջ����J�z!�Y)I�!��(P���]}u� �"B��Q�;t�F����VT$��
j�8�b�7�ů�k�#`�o1K��w$��/U�X���1�d?��1J���i�_W�T�T�!��5o԰ܿ�g��?l`FR�a��Lk{k�K�L��J�:$���0I�N�y�NP�#��^��&�͢������t�3ܣU�%V�Ui�o��T5����΂�E�0Z�Y������ez��f8�^��H��P�ˑL��*�%�l!�e]E�Id����^�>1�
 ��  !�}��baR�  !J�M�:�+D�<�L�k:ө��ѹu,����ϵ�;���]��j�r/j�&���d�����>v����IBt
���Yiu�]�Z��OI���f0�$Οo��4�v&�5>?���Z7;A��v-�vW���Tlq����|�Hq2a�+H-�s�s)�m��nɹKʢ����i:X�����Z�M�ƀP��"	6�϶�X��gjL�#�X��fj��K3'/�#���b�sL^�8��"��a-��@W��X;�
>Q�򼟕X=�R�[��,�� ���5z�+1�vibZ��c8@�_����t���:[{f���1�U�uLv�h�I�]P�i���o	���|��^L&ϲic�����.� ��!�������  	Q��*�d֭VIY}�=��Y�x��C8������E���['���[U�JMU����fR�u�5�n�. ma��+�nUuq G
�ȫY� W������/�h	����Q�p}��瑚,�DURt�O;�F�P�����^������o��Wy}Ox������C�]j ���j;�:6�'�	�܍DD�'�B��L=h�����[;WU���XI�?Q�<��X���ï��I�s�^&�N}�ܜ�w���'��+�*��g����X�L��vE>ŕ�	��Cd�+��p���`�2���XwFطD�kɡ�\�93z��#���2��K����pzS��cl:\S�4�����P P�3�      ~!����a�X����41}]D��r*]� iIJ\G��B�"x�c 3NA�����?��~���^���l~�m���/�˹�m�z���fMF��c�״���A���?�J��^�+:]����_��]v��Re����1��/�Q�����]x�ϼ�⾲�{�����%��}��$�f�i�������@ĝ;1�
��ٲf��i�(��0/�%u#V�B[����y���r)ֳĒ5Q��H]�/��*mW[{R���Pb<�^V&�f��5�hv�ߵޠ˞L��،qz��7|XayL�Z�����"�{�@����r��ߗ:�6���:(�㷦�7A��eCGՒM�>�=�?���@X�         �!�u��c�� ���U�2��S֕e�(�eOg% f����W9F�7� ��`b0G����a֡\��Ǐi�j�J����������.��
N�/����K�j��g�
'                  C�    ���                V�!����b��@B�RV��j�U `#���0��|x]K�=�0Ѽ�Ѵt�It@�wG����.>��bN�p�=��v--i���R��Bnݗ8�;#��(��^�%��Ұ� �#�훦#EC�o�ż}����-�����j�h�}��/���}a��!�y+o�������K����X-�#m[�4�R������cOC.�Oc(�MMSｱ�G/Y��CUr������aĭfF÷�+~_^b�ު^�r�E��; �s����ݴ�W��]��F���u�aOC�IQq D�L��%9ӌ���&�a%�Gd�=
�ɏ�umƣW�/���L��/��
�qz�y
dd5*�$Fipd�M�$j�"��j}�n�Q����tO�Y�6�K_��!���4� ��o*5���h[��m������K }cH        !����b��h.��"V�*Z��5Ui��sr7<��
��/���W�c�~!r�tC����VWA�����9Y3V3H����ԟ��t�T�3d��a'&e�ћ�j�����N���h�E�H�rm����Z2��.����P$]�`fΟkU"F1-���
�/��@�:t&5ǍK��=)�9��;�,�+`8��l�++V��;,��ҽ)�j�͉���
 ��!����b�0�j�)���T�%1|k$��)��
A��}�6��O\�'3��]�w�ip|�52�g�ؓ�|g	����O����T�W��]Q,�U	Ƥ�̒�8O\Yfm�[���J7@�hc�ߊ��;���"���}��q����=o?�q�c�w�@h�l�^k�wǱ�q���"���l��_ꉄ�M$���ʕ���\*��#�c�S9fL"�l|�|#�V��Ѽ��RJk��*xҼ���~�� �W�(�5����a��
ܚ��t��suJ�
����m���si��탮��T�m���=}5�v��א�k�Us�Ic.|M�Uo���~Ӫ�`g�K��\���k��63_E�V��:�9����t���[�������w�C�r:�ޤ�s�:����.A�~�!e������u��A*��iP����T�2��.��"�*S��^7hL:d7U�����Y��fu͵�M.u
����^�`1���V֓S(�K���I��J�m41h��8�u��4k5gΫ����Ɛ }c!����b������a�5Pe/Z�B�aĈ@]l�dM�'����gs�A����G{K\sIu�/*�O��|�^'�<�����:��p��!���m:8ۖ�Q�
29ʱ��4o�(��E4��8'�j=]�'N�Vwl�����>{+Yyk�����4�5,D� mw���{n��j�;�ő�%/�;]Ť�]��	۲.��1�U��|-eW�6����I�" �h�d�թ��'�'k�1[I�]��=�MN�o�6&D�q �x�2ǋoի�L����o�>Wk�����      !������L #�i�Q���"��;Wl/��>b�*�z1��ۚ5�H+���U~�TԒ$
�˳j��8�&s������n�qv_��4�Hʛ�����y囊��|X�Nd�ҩ �Ȇ
[c`˃5y�^b����}F�.}:B�)�ĞI���SB��1�B��O$�[f�צ_�\���Q.w(J����|Z ���^�k���}��Ly"��f�<�����C����O��O�@�� !�m��e��@@QH]K��W�����_rĹ]Qi��,��v_���0\lQ������=W��m�\�ߛ�g�����,<
jyVhȇ�m��Sȫ��1�j�k�Mj5r�|wJ��ҠM�������>
Dcp����,e��Q8k5��!�ȩBAjB�J�%Cj\�i9�B=8%Q�T�3t;2� ��hAkPk3�XP�G�����j���j)މT����ϗ����� (�@            8!����b���n<�"gER����T�Xq�5C�i�oR���@�w�`�ʀ��TZo�����R��Cw�6�����/��w�ۨ�6�0���p�K�6���;b�_(�DLѷ!��0L��{ܴ���U���y�ȕ\ǣ�#�d�?
�}v�\bBJ{+Q3]�d��Hi�$�LQ��3.NnYu���(܃�6����9�Amg9�Z��Eq�?Lf�VJq,�%,�W��c��mʀ2z4�j:�$���!M�fprX�q/S-�
�'��b �N'.�����$6�4v�]�:4��٦&�Y��z��g�ثi#�N��-`�U@���ި�GZQ`�}&}��Vj�z�O1e)�6yHQ��v^B
���x����h@X�!���¡�@Aj���*QՐ]�X?�K԰�Z��i̧M�g7s��L��;'��~�&p�MSqqj���7�j{��q�rv�Z�m�4�������Ȏ-��1Ħ	+ĵ ��4�	�V�*�B.�de��t��
 $6��q��EUj����n�O7�Fu�s����Q(���bV��|?��_�� 
 ��!�����@@�v]Z��S�	K�@�:�a�75s6P��Lun����t���O�į��b[�Wd�����؟%��!F0�:u%0��^'�n�-,�Iu�g~��� Ҷk�KK��V5Q�,=�6�}���b�9�*#�^
fù��f�,�8%� �����j����M�Wlrt�ֶQ��#�u�b��c�O0/�^��i�1� G7C��[���&��eҒ���h��B
J��1���G	)SݲX�O1~��6]_E}��[=�U���l��o���#��<����{��D�yv!f�ٱ����)�)3�B/[5H���%fB�ҊxS�	1c��ii0���+�'"] �1B�җ��j�hkc���'�r���ꅂi���]y��L���
���Yyj�>4�(�oY�Uj�;E�Z+3!O��v�k��]�ڱz�����ҭ�7�������N�u����G3pJqsg��kK����>���
 ��!�}��a���n(
�gR����h���0���`�����1k�K��-���t��z�)�	
]�����g�ch!sږ�Ԙ�H�,�Z5٩��A��l����b����)��zs*���Ǒ \��8�VѲM^�J"���Q� �:�I|k�u2P1���ܓ4���\G=7A�t�L6R����=��)5�9��������x��@X�   �!�*%         �G~���,��6+"�w��B7�E�4=      ?T�W�FM��pQg�̑#� ��e�M���%L�����D�:%��������+�\Nv���`�9��hHK"�Nu)s�;�r���   "�Gɟ        �F�     t"��0   !!�J-�                 P    ���                .�!�uƍa�C\   n�U.뚻ԋ�/�C�.Y��;�6�?d�X�hj�ʌ2'y�f���H}2)�����m�\o"G�]}���#q�^ͷ5!۶�(��I�0k�&|�M�]k�6Pga��[9��X�*���Oc���0��z��!�J4��Y.�e[�(�r�w;�>�o�;w���Y{��w��WF)&�	�JA&Q��V��c���a:~�3:[�UzM��]�=_;��ʢ�N�|�_.�d��It8���7V���{�Ď�u6V]����Y�_f�Ȣ�v�\��'\sYC^��!L�S����a
e�#˘LKm�%�I������;X������Zv����]Ų��Ǚ���&���6�dEׇ�����x0 }c!��Əc���j6�J��U�r���J�d$�ɑM[J,ӞF�y��p��ގ��J�P��=�י"Ӊ�U�F�hv��9�3� �ؽ��	w�����/�յ��S�<��ז0x�7+�Gw7��ɵ�i�H��Mw.�ǵe�穻�B7z�Pc�B@ǠsFM\��{�7~bzeL�����@3�nLq+��5����&��KXP�&A��d
iK镄��}%I嬥� �
Wo�8ad5�5��za��(����O(���C��ض�_Q�sS�������p#�!~,�~m�{s�N+ G��޹b�{�/���a�"Ns ]]�['bO��D9�����ɰ�z����w	�V�	͑���v����
 ��0  !�}��a���  CL�7�։J�q$!���lo�i�p����NG��V�H�Nq��]��ZC�,�e����E�s:���������}��@�i.�Uv	�g��J���������ee�#�w�=��]�ză�-S�=����O�3/��S�F��>�������X��5����M׻�%t�h��h�A: �)y����,l�2�d�1U�C��7�g׀��YZ[���� ���,:�ιX�Ʌu�g(�}eڜ$�k�XC?.�?��ˆ�UV��IR =����rr
�����ݠAvL&4�#Nj(��Ǘ8��I�X��q᪫�ڑ���+9M�U�UUDcϰȷ�lci�%s��]c�fy���{��?��(�� 9!�u��a�C  �\f�%],0Pց�E��S�[��K�^��nڀ"i���^ޚ��cQ������4�j�u�vIG�������^q\�̧2�;��y;A�:ykrQ�
;��UU,q����s�C'���̀���`�Jz�u�j��cR�>E���!�F�j�j$W078�[��K�ګ1�q�X�Q
 ��`     !*�m��c`��  #j�dJ��^�� G�2�Rv�2 �ǹ"��O7��@ ��_tf������t�'�f�-V3/Σ����I������;kUYת��/6��ݣ�\��/=
���� z����!z����c�P��=�yw|�'��u��G��#���e�ZH��T�~��>n}�Fky�/�����Va���q�n�k��H�O!�:5�p��r��ҕV�YN38���RUv���f�˶�>O޶ے��5�q�+Ҫ=��^\��/��ٕVG��ڗ�b��:���L�k/h��1��N���5�\*e�"�o��E�\��\�a�AU%*TJ�|i�z�z�UE�u�#��']Q��t	xԜ���-���S*7D<,�'TS�JE3z�2�V��yeo~DF�ƹ~�	F0��2ꔑĤI�ϐ�b؉�#�KFE"��B��5r��;�U�g�)x$`(u���u�'jEUt3��u�O�d P�=!����d�C "⡒��!����%�i�a�&����I�m��F䟲O�͐�1Nh���$q*[�:�55Fթx��$b,����x�̈́/[��/g��m;]��T��;Ǝ7o��<bi!�β�cE�s�Vq|u�1������0��w_��F��K����ڏU~��=�w��G�Փ�t:����&���rX)���.��3�\
g�e?^;q�|��u��,�m��$m7>�c�V��Ko����U?Ӫm�a���U'��Qc����3���%ΓEi��B�xד�I]21����� v��`��cJ����>�^��6���7D�WT[v�׭����{i]�71��S�����>_W@�>��!��Əa�C !��|@��㊨�ȡ,d,C�f�y��u�ؗ?ӽ!׳�;}��ߔ~�Y�� p7R�5���P��j�2>`v�/�6:�ۥuVyW���U9P���Ì�Z{�=:H��b��Z��yY�O!�@���]�>lHȥ�~'KY�4x�/�Y~(v���}.���|��	Q�4V���N(a��󀴡�Ii�&��}���sFu�L�]6����/�sg0�L��&���>�v�%�|��%�5R��m/Z�~FD�/��lz�~�ChW�%:9T�(�c�ܭ��3F�E"��?�9Bt⤺��"IƳ1;d�m6"QU�����>ñd@J�������b�ң��W7���}�#K�� ��v!�}ʑ���@��H�����j #�1��:�v#Hu��)�����PRZ�ی�^ۜ��kn��>��uvf�~An^0�$x{G7��zLt�s�|�*�
�R�2ٽW��3����l���xk\�e��t/c�����UH�'Ik��Z�QH1@K�t�T��Qm�`�����H����*�_�S/��������?���z�M�8��2�f����h�?NI�P��
�Ņ��e0����A\��<l4�0C!���rl�A�0R�����j\1J�c��+K��-�vYL��a��w�9���^�gA�E���#YlD!�#W���!�-K;�� ��!�}�����v��2¥��
�?%Y����|l�<Fn{
B(v��6StcP��A�A��b�Q_/
�2��c~N���՛�2�x�Y��gZ��L�b�]�m�m�J Ӈ��E���I*���<�g�oݘ���k�����9������.A1j�
�������C���/wnđ�cR���Dv�.��r:�_[�?K��
 ��!�u��p��JᔅՆ55{��&=�
ˮ>�A�T���2��V�&3�QN�����s���R���ح&=�,����nS�_&�Z�z�kZ���1�[��2�&��ѭء��t(U����U�BG���cM!��/o�pK`��.���Z���s@�:d�|
`�ޫS�˺czG6�=��y$TXI�Ͼz�ϰ�j��bS3L# ��S0&%�T�Ez��D�g�9/͙�ᯋ�A�&,�}�m �O��]Uע�Qj㴽�����/�� �� !�պ�	p��mXш�^c�E].QBe�wyMU���9�-�I}K6�t�iP�����4��iP������|�w���Gq�Ÿ�qp�꣤�&�G�a�ǻ�c�rǔh��?`@�-חQ�KV:~_e������|vU������+-l˛u|U�*���Jv�z�k��
 ��P    !����a�B  1��1x�Z�$�T�G�� �T.�өq�y�fdI
��7|�ZDlx�����.3�^�'<i;�Ţ{�v�<�K&��Y����/�Mo ���Ԡ��V+Й�de��l�)�
��$Z>���*�'��#F�_�}��:Fw�Ѻ�4������/��g"���R��4�0���h�%����L�aD
� D�#H�
�cS���e�t�*��؋�B��E�$C��g����ȧ��׽07?�-�G���Q<�!�۸E�, UAWiV�����HJzL��`4���W��7��ƴ�����U.�dh��傤ѯ�`�Ze8�g�Y���S������M�^t}�G��Ws��ޫe�s}�l"L�w����$��kIB������z-p�>��!�ղ�a�B #W���yk���!7�����Ԭ��שf��������UWe��'�1^<j���W�'���Zi��/��
�E��
�t�QHN`�wD�$-�DX�&^y"E)�dYdO�Q���;��0�U�cM�j{qqik�"��ӏ��'憥�-n�߃����)�E\iO'�� P�9   k!�j7�                 >��)�r�մ�E�]LK��;���t��c������Ϗ�ċ����9_l��U#���$k��k�5K0
�	f��-�D���ЎL��WF]�FF˲۾
�I��j�gJ��I�{N�c��@p^�)@�m�[����kC�
=Q��u�>���V ��-�x<�)�����cK�,C*������+OJr�Ht��P�o6�$G	��gL �_WF4���lJ�CL���b�c������[��:�Yq={;����k驱v�}�#o.��7Í������7K�oj�J�S��dL����r4���1
��(��]�*�O�t� m�]�@}�:#���m �>��!��·b���P@	d":e2qwc|"�T�/ �C����C8��Uw]��H�M��U(u�x��l/��`��nqpO;󯬒�Rq�@�{3�m�C��U�|E�ĦR}s��f�r��s�:����@˧Lb����IG��qնxdܣ��W�)>�����~�%s�t�������on��t�n۴���=B���j���ᐭ�d�(a��K�0�Hf%Й�-��ױ��؎��I�����N��%X��>�gi%���^��ze���ik�YWW�vܩ��@��*���7�:�X��B܅���̖�=(F�@5����.��m��r.�g�z��r�:�2�W_cr+PG��r24�
k=nl�3�P�8!����@�P �uk��
�x��RZ�H,��cLܧ(����W��Ln��{�4�o�f�>�6��C���+����/� x��
��j�M�I�����d��ٸ�"Oj�Ja�u�G�i����8��3{(�A})����w7����\���|2��6STE1�U,�W�c���x���n��x'�+������L�ɼ����<�f%W�)���(h�QmQ�ጎu�J����-NM)�"�F�o��g����K�aiлw29n�&r��ίM���h0�~A��V�Ҡ�2^�.�+
Nj0�J��w����$(�:.4�����:�,WU��z���k���}ψ���J,6�����e�L��eN�E�,oմa�-N��v!��ʉd�P�T7	��8�N6��yk���%i۸���]��lIU�U�CV�tn�q�_��|���V_�WH0~�I�&e��A�?��͝���L�-��k���<g�h��Lri�ֹ�7 �P�ש,��3��xsK�ּ��d�'=�6���{f�:>��M������YG�ǽ�y˨��N*Y�Ez�e6@��4K�%*"��
��& ��RC�	k�<���=�-����rg��3����x�w�X4���ܑn΍8M�`,�#[�y�T� �q�^��^�L'~��2�u)"��]S�=�mq�~�-OPV88H��ݹ��
daR�Kٓb�8�nټ0!�	d$��W�
�ů���U��Ӂq���D2U~�R���}�Xj�iU�=�y=�G�&���Zj��g��q��6���"�c7lX- ��(�qZL7�V�����	i�:��"Ra�y3hUœW:*�$ze0��-Q`)��%�d(�F�q������ 
 ��!��ƍc�0�n m�J��sZ�"IU(�V�Pʗ��84�jo0�)!���,a���%�k(�ƛ���@���ɘ��;�����f�Bne���0y��#�����"�uL�7W�)i)(�3:���_��\�7�~�g�@���}��O��_�{u��w؛�Û�IA�6����n�F/�s�{��VÒ�/#h�2��ב5��f�>*s�h�M�E(i�J�W���]HMl���;i���Ӈ����B��s���x��գRQ�U�PU���7?�~�W�bpn*-'��
Zx�;)��մCM�'D�g���F�B�9��H��Sգ�n�h�@�q�����7�AD���k?O���b�����^��SB�Fy������?L@X�!����a�C  CL�2=qz���$�`�r��n�^�;����.RF��*`���f�	1j�kQ �Bo�A�v���8��=�{�2���b���*��Շ�K�:����*��)���iv%��q���W��Q���r�;$����o�}�f�}P��_���8]W.�n�{_��[}��.����g-�o���f��'B �@�)|%%Ja���M/pQ�	b3�ǎ��lpT�����5�Gm
 ��!�Ų�d�P�T%	އM:r��2ȕU8=��0 .�d��n���1�E�H��i[߇�kd�l�s���_;����	Ś��Vܦ��U�����O��F�3ݶ�h��f`@�X�.;4��{0�-�d�]m_ ��-�"�=׳$�ZWq��6���S�r3����Y���޲�f�i��p�&Z���
��G� ��\;�9k�Q$
 ��!���A��@@=���5�޵Ʋ�M(;�x�u�@32IՏ�]���I๵-r��@u�e�Yk:H��P
��T^3m-�&�U���
]��7i�s$�(E���S�7�K���#x^<_���	�8fc; ���e��`���ۤ��4�����5G(;��cK<�N
���7���Ǆ�Ċ�VՒQ�QF��"^�nzu�סt��vkW�d}_��tZ�h3��T�y{�7�iOg�~���%9$Iv�Q�6z��a�&;�e��~�:���_�Xjx7�@$�k^]7�A`q�q
��E����R���ڔ�}�#�k��_��R7�����[�?���:Ŕ�c��P�mSZ`�{028eK�ާ(6K�#�>Y2���+
����o�U��D��D3e� �?
i�u���ED�w�I��	��I��l4r�Iu?
�;e���x���'�]᳅��{�a��� غ��*��nH�i�i�X/��a>�����it�󞤂�>Ն[��ဒ�9[�`DR��摧t;�B-�����v��6oS�r���&���H���½��n
e�B��ނr��F���!�x$�8v��7y
��6ݙ���"7�5Y�N?dJkc�$'�&�_A4/��'Q$'	s��7�L&����@:�����ؤ����5��QF�,�?v�ߒ���3���@Z�cH� �!����b�X�V(�BY��K$YS%m:�B[+`��/�I�u+k<G�F�o%ִ.�ǟ�F���Y5�;�m��ԃRz֞��O^��9STR�:fb�;�gp����J��t�!����4����I�ר�j��a��ˎ_�s'V���v��J�C����"�
�����n�X��\{i�S�Wl��yU�^{p݆����.��f�n�����
7`�ϳ�[]j��뉱�����ȩl�jS��q6�#�˝��@X�!����a�B�  ����t�5�
�N��z?�I����i4o�䲀���'qo��Z�͋��w�>�qA�=����J�R��M�n���c���\�{��'�{�Jm��͢���-]	�,�W�A�K
��K�8�G���x�$�AQן�ކ��i�
�y@��!��Ɖa��a(�2���M�z�q���d���Qt;��;t���6dU7�ŷ]��0j~h[�V��;����7�-@�U�V�"��`5\���t�*Nn^��{>�o��c��q+m�b's�[����!�������WI�$p�O;�l?_C���|�;jm�Xd~����\��w���h�z�I�%�t�VT@͑d4N�"͍6%����[�u����ѱ�j˝�U�.��м
�e���A�~2�Y�b9ۻMXy��]�Y�2�s[��:ح�g�^d�+�E����[����w�0�%!�c'�/5������+V<ⳢMS�$���[�ݺ_�dz��fl�M}Cq�t�><������S�û2�E`7k���+���m >eB�6���T����
������3�V|-��V͟d/����.���~�mM+�~}��b��&��CC1�6Jep!�ԧ����S6~����e���V)������
�
��Q��c�[��UR}%
1�1��Ϫ��
�ȃ	��U�;!�2eD����pC5����Ѡd�V�RIF_���1�*��T9�g3oYqi]=�q.���u���_Kr%9F�8�$lZ"�ӥ�k�z4����F_���-ݶ�ɴ������]\���M(/o�Հ�kt��M�|o����>��!����d�Q�����I�XP�f���"�E-ek���	��;B�9���ٜ����9��*���3����� *_^ߋ�Z�t?;Zl+7y��y��Zڦm=?�O��e5�Ky��ۍgyv����~/�mQ�߾�2���m��[/�k�f��`��lze�������ה��fg�ԕ6DE퉄,���7��HdJ;�b>R+PL�G<���M$���2�hɛ}3b��A�Il��V�k����o������
�M���`*�:�2:���I����2F^�5X�ҟ���R�P$ ��D��S�K',�˜#l���r �9,Aa���uoS�ζ����udQ�Ur"�:d}��K���_��7 (�!��Ƌa�@�(���[���U�������L��d�
_d<;��T����M�؀(�!����d��@@-UU=�4�)�j�/��%��N5��RFp拶D�ry5\�Q�?E���Ⱥ��;,��o��}��z��f�&R���~�;m}��Bg�0ߪ�ܝ�K���$��-  ��C^AU[��g��������鷘oe����-�u3�[n��N\��������f��#��ooR����X-�"��!X �JiR���oo� 3�!u0��i%�G�ğ2���ZT���G^yDgqa�2h?������m��Ki����*�;�oc����\�?�����)�(ͭ�	eo�L����HRh�Qp�+󇁪�2�Jo�ӝ��Q�F�g>!#�=0wS�L i�=����h��]=�U��NX�>��!�����0�n�
��_�$���R��M��}OY�}� (�!����a��!� �kX��N��"*l�PjIdH��M��$�Ld�`���r'����^�����i�c��y0Ǧ9z��2�.#����$����R�̼}�B��}?�B�G����7�~¥�q=�V��Y�1�kS~2�k�F�mh�
 ��!��a�QT7���c�\_��!����zU�&�6U���j�z+gf�!j)@�F�d~�`��Ĺ')!6T�lQg�4�4��acݫ/�o�7�G�v���V�_�)�~�	�z=Ω�rZ�

��������H��������gfj��m{��}g�Aq�ס�?b���ѣ���7���
��Q5Ϸ�4���6#-�3�]u���
�^����LKYP�4öiSk>�`��X��|�
R؟a����-D��<H���p�([^�F^�8�մ,{�lژP����|櫑i�d4��%�t��u5-giA��K�o���m�uz� }c!�����8@B�頄��j�(�i����[n݁`�2dN�A���
z�l�9��9�����l�g�g6V3�l�o�0_���g�������P�t�<����/2�WZ���*0�d�oNnڗ`���Ef�J0�Er�ߚ����u�����U�K����
�9
֤}N���z/}�H }c!����a�Xh�w�]7��e.�T��@�4� ���]y'�$�*�A�yc:��b�z7�g���ԁ0�$���÷���ퟛ���]3�ܜQ�'��n�t�>�C������25��l��럧,5ņQ�����F��S�[*�$�+�(�g調�u��~�s�����OG����+ޟP����+�0�g���6`�A�qU��z9L�V�
��8�j�y[��:y[��٥O�8b���Z1���<|u}���7�3jK,F�*��y�$��E��@�U�9�����1V[�ȣ�,¤b�#u"���k
�H�+����4l�&)ޕf��Ym��Ϡ��N=
 ��!����a�C  	F�hQ����T�Ge.�W�e�Mt94R/0�T��ePKr?���d����Hm\�#gV��<���'lO�kx�.p�A�a��p�<�6o���ŧ���g�:Ԟ��+��jC�آZ�-_�q��9���H=�c糀2<k������j��{�Y��L���9N�m�{�_n#:�^�gѱ~]mg�����HM�3%o���Ɂ���a=.�O:|K��|}�&Z&L^�$�Zn��V%����_@��S6�3W���&�r5揇aJӖV�-�9�
�݋m
E�Gǽޓ"�m�^�$��<NO��G"�(�!����a�@�pg*�:WO
=�`x_�`l^M��6
��o�ʒZY�*d�^
��氘�0��CW$t���6s2��q{��VRà����-ɝ�ٰ2����4�G \�r�<��%��f�p��E��⬀%޹��{9�Qڱ~R�F&�z�.�Z.R�a��c��*dR�ɹ�I�U��2���8[�o�O>V۴�Oir�q�߶�Z��v����O�������'�^ (�!�ݶ�a�ء�K���*5A�|O2%HP%�z�ma��>�v��'�
��Y��_>�	(��Pƽ�Ų�}ކ׹�R��vs޴�&�]Wpt?"��o�OVL���}�poۅ���q�E�Ӌ�TB��&�H���/������;�NG��	�h��l����<�u+��:�tu�rՉ�>���js2�7�!!iƂq �k�!�-�I�r�꺍E�@���N6k���_�ϛ�{qi��Gc���G�#�ʺ��9�9�[l|�\�v�"���s5WF�kGOȍ����e��![z�x��0�Fc$ E�I�xl�2�иϱ&o~���!��:�w��O��������5�pYbƸ�� 
�s���9�<NN�c���(�!���d�H@D8�f��zВ`Ǹ:�����o�ws?N�$`B���4��Ak����y{-r�Рw���/#���ѓg��]���k����cpq�-{�s�dF��S��tw��7�~�7xi> ��f�o�O{1��=o�F���ɯ���c��@��ܺO�5G@�՞ŗw��Q�u����nJա_�
�Z���r��^�ғq���J� �4/���g�'g��϶Ei�Ľ��� ���i4�M&�I��i$��ϔ�J6����yP�M&�I��i4�M&�I��i4�M&�J�q�ۦִ	)�5$HuBe4�M&�I��i4�M&�I��i4���T
1�����x�Ι"�cfe�ca�}{H��)n�zU�fC�̠�=��X�@ى=��{?��rs���ڱ:������'hf/�zx���Ё�L0āʉ6���V�*Z�l��h0�2�A��i	��ً%e!_`p
����A�`�p��d=�tJ�JwQ��h�)]��KX�W9����R����O��jm��5jd�~2p�j��4�L���@!A&�iQ6��X5�M����)'������~)�  �u1�}=�`�7� ៎n�ޅ�jg���J���U���X+
�}2��u�_��E;
�#�[Gzt�  b!��7�          q�[�&s��#
j=n�
��OT�p�2�jrb�P�]~,�5gn+F�)�Ր�p2�t�`��uꎜ���d��1��A�8���W���q8^��:�h ?��}�( ���MZ�ë��b)���'l~=�MZ���̷��0	�8^r�t����w	r�nЎ���k|E���/w!��ug3�����X�U �!�e�/���3JތH꣤�G,cpV�z �<[��f�4C�Sj��2v1ى5���)�-ߙd����+U�� N�ŀ'�Q�lO_��X�  H@   L!��7�             5����7d�&n�)hs[ְ�Z��\�����`�̴I6ڙ�~��b�tp  ( �   6!�
7�             u�@gﭖ���j?�.!
)(��]yQ6X�r3q���;y�r�ֱM� w=[]/��Ma��V��]|�����<�s
�]۸�#'j5�H3��+�P��L���S�dFI�=��u��-���߷~~yp�5mW�|W�-��:�/�x�y}���W����յQw}6�ʒ���g�X/c>��6Ҧћ�z��L3q�W���Ǧя��=�z�f��z5��nm1db����XS�y*������:L�}�d�ᕏ���w�����xrS�������ԥK0"��Of+�Ȁ���	�zĄ�Sx������6�N�����]ně��.׫������ (�!����b��a.4mu��K��_�f�S+�����& ��-���EQI�
ٲ~6-r�������mXw.���@ݶӢ���ݎ�2�����4v����+�FC���x�1����d �mp��N��3;p��O=�N3��Vl<��]=u�;j����]����B��
-褤@���n$H�Al�OoTi���������_��yN3���b�}^�����k,�ƿݸ����X�s��'���8�:�o/���K:�@�C|è��x��%�(��VK�K��_j�>����|7��`vo�����i�w��$��s_��u�4�b5�'L�a]2�(M*t�+gQ�� >�$`��S��S��C��=h�9f�EA�m���3B�R�HS�Knn����Xb�N3:����j	��g�s�!�����@�DXЯ�NPW��j -ƪ�[w���*�T�L�����|3i'�7k�5����m��Y�]�ۢ�j�:7v�u�<�P�:!����b��@@FK�Ȗ+�R�2 �C�B��LY)tgT���k׭��8���]13����0������(�#�����M��vc�Qxر;:�8�s���q&j���F��
齺2�@�E��ohf�bz�FO��t��/Sm5Ѿ��{\��s�i�ɴ�Wd��chs�f�q��Ԥ40�� 
hU(�R�:RB xXF�
"�Zt���n�-�v��65"W�
bEY�U2ȡP�����s���N.�aW��{�Ln��������[Z�%R3n>C��x�5��ڴ��l��D�6���v�k� ��!�u��a��\  U�kQ3C3�R�I&P��I�#
}�EBHI������^�����������?o�f�ڷ3�?����l=	o�q5>_��:<���4�뺵
���.�b:[ץC̡�]��BoX�4�#ZT^�u$��t�J��Y72E���b�{����߷�ַ?}��:=＠
 ��!�u��b��  
�d�SՉ%*`#�i��ų-'���s��]��Ђ��ѥ��,_
�k�
m�K�<º�4�d�辥�<=5���9��1���~ԽS����������1WV!��5\	��K�PdSY�K� 0���c]BH�%&��'T���d���z{��X�j+����.�ڰ>�ث)���zW����'�6������W^�{��Ej)�һƗ�a�H���B�-�S8
t�Ï6L�Tn��D��u�{�{�S�I�=�I��ӱ�J�ڝ��J�3;������v��@X�!�u��a�@�W ,���58��U VZ�tPR�P]���
1�?���,���O��^B�S�{����w�g�<o��rӪ���*�-ٟ���g����6����h�49oswz�p8�G��XN�ky�(��'���D�u�p��q�i�v���&���~A�?â����|g�d��� ��+ǌF�l��* 1`[�p.b�q-�j��E�Ssi
h�����
�-�[E�YŐ��ԟ��ᭉcsa+t��bQ)ǭ�0�)�+z��r�J�ؑ��)9g:@�=9W���
 ��!�u��a��ig�r�5D���E\ʼ{�d�IO�U�u�[�^���Ʊ��t�E\����Hʹo4�Zq#�SSjs��O���+Mق��EOh�tņ�w���k�_�����9f����V���twA8} �����J����u���7��w�>�tA:v��=^�����]��PՕ�%��Z�圡$�J^��B��RKd�`����E��"���n^�,Uz&uW���eYѴ�19<��aMC_u*��Ǳ�����Z�Q�w��%%[t��W:[C�����6�ؓ%��w����Ŗ�BIHF�����z5�X�����!t��I����T��̻G���Ua���uf�����u�&�T��L��1��u��j` ��u!����b�P�
�� E���8␹��#�~m��Q�=��sg����̜V.�|:{��u'-eѸO��hc���j�j<�'K9^�p��:��B5�(�謌6���Nf���ړ��z�n]}Mo8��%w�)iRaG��/E9�O|]�o��>��4fy�,*j�#���X�-�]:�>��b+����"v�n���O(�(�4�QCG(4��R�o��6Q ڣ	����pa��G�m]��l�κ�d�qi��0897��+M�\����1�W&!�󼂤�B5�xk���);6�4I��8��s���BA��Ԟ�:lܵ'����z3��Ds��z��o���i��-���i�w�^ɏ�ǳ���~  }c!�}b��@B�wP�U�RJ��6�+5�pX��(�9����݋M��*a��,a:���������e_8��E=}"�z�#���'SmN�%Ki7p�(5����7�횇i��c{�ȴ��@�����x���w87�Ti���<�4�����u\#N�9��+`��� �
WA���-���)��,��ѯŶ��	���Ҭ����eX��VLE��pX�M�c�Fu�oe
�{#���H����*�(a1e�`l�e]��HF�x���%)j��ǝ5���J��t��M
��Q��j�]q����IM���:L��4%e��)�y�
���:�gW�:� }c!�u��p���U�Le�W��+`�HI���6����P���L�&c����7����������x�ab��v�}�t;7����3�aƗǫ8-�
-���a.�4-
e�V��}"�D��/���cѥQ��>�5���h9���i(��a�;j��y�S�2��;��߷�� (��          9!�}��c����
���T���Ϙb��g����a��W���pV��(.?eŋ�/]4�v�����un_Ea�Ԅ��Z���=�����vg|�������{�6y'5�����C(�q`< Ƈ�J[TFu�O���ի���eYw�2�Lٕ^OA�GV8f{΃PÈ<����f
;��u�Z7y�m|��_����z�8�U��.�yx�^�촑P�L\��fNL���C/�~V�(�-�^��lvYJ'V��%�:��(CM*4�m�8[����
���J�����?���� P�0�v!�ղ�a�@�*�����B �x�RɑcKQ��Y�anh��X֑��}� M�puM=���Ȗϻ�;'۳�yB��BGfa=3�&�DQ�<����h:��$��q��&%���*�7�)yrj�gڣ��2^Y�����S��g��U����-S���0�nK�Ũ��fq׍��.S�P&E�3[%$\�B�C%�t�c��1�{=��7Xm)y�|拸�WY��,6O
:n�֊�����$/U����~�J�!�M��"w���hW������M�V��f�:K6�=�@�z-��y� ӊy�m���	4�V��sj8�a��)mE�FW��2�"᫷�a\���0ɵ�������x=w�� }cH        !��p����8B"��Z�TK�M�=�R��QD�O�]--��F�ځ�HU<�<eW�y�vUl�����9����־s�V�q���~u�
��ju��nS{��qd�0�fë��,��f�[pA�ha�Q�԰���ʅqe�M�.��n���n�9*0�2�d���	�G��EV���eX��mu��`��J��p�o<��4�Զ2���E��TRFC*N��$��$Y[�k+Lq�Z[h�:����#5��5�P#*�.uCU�OXh-��:^Mރ���H�>��           !�u��baQ��q�%���)�U"��.�ՆJ5.�ݡ��c������w��	�1R��ث8a �q+'�i_��~�*���]��%��h����tHy^[�h���g��C��T2�<��p�U�7���N@r����*�omg�/���k�- m��֩�c[܊�/�<��4}�6E��"i�=i>mN���&�H�35�/)�7�b*�Sf�c[�AM�~���%�T���|0��P�8E�~��I��
��7gz�[n�D,n�O$�ES�����_{��O��� P�2�    u   F!�7�          q������?�X �L͘2P"����&�T�p}h0�ZX0,��`r�B  �h   {!�*7�              6�>S���oz���R�
�?���\��3�UM>J�ޑ>���g�f��h���;����R=Q1yj��P���ź�b��Ph�b��I���I����o9�F!�SV��Bl�z�x�5��c���)����+�}Eb��ѿ5�F�L��{/���yR@X�   �!����a��a.
C�Q`4)}H6DIl�tU=��[]��,�_�k��p�e���>"��&n*oյ.�T�k@}
��\7g��mbv�?�X�@�(�ȸ"<౺P�,N]Q�^p�r0��x"���}M�FKΰ �c���9&�v��aR���vy0�{��%��[ev�(jig�q�.���)�=���~&(�uZ�4�P�@yB�T�Fzn%��7#�tASmhK*=�I�,p�B�����*2H�݌H m\1�_Z3R�s����t��!��4���߶��]Z��;��{N�~���}�S���.�@(��      ?!����c���N#W߰����0ۇq�t+Ac>C�v��tmMa��+���M�q4����	�*0��� �Ov^S�?`��Sl�w\%c����S�UU��G�I:���mq1b��ȹ-f�g=Cj�܉�W��}�E�o|�÷���s�7���_5�b����[�0ċ��f��Ք��8�$q>�l:Imw���Uժ���y4i��,3�9�n��-fGu�&ϰ����R/x�L��6��|{�z�J*|�z�$v�t�6~��6��
s��n��h*��������u[e�e�.��Q��s|%~�E˝��oѬI�,���-�O���H�{.��{������s����߄3!Q�''�	�
�/Bɚlۺ��x�X[VU�Teȕ1�
�l&����d5���zuwu�8��F�bE���?��A�Q9��+H=�T�@�c,��;w�Ղ�ǝr�/��9B�X{=mձ�&�|�,�a\�m�JP�r��|}2>7��yO�Ne��}o���{��dfM�m#31�����>D�味��yk)�<T	��z����� }c!��·d�@�� ]Yi���_W2ȋe*����0����;�]��* Q �A��8�{q��3]�|�)���]dH���p�����׫�h<a�ׯ�<���y�LQ̆�S�V0�G�y�ll�z�cx����%>¶,�����|u���E۹�v�1�.���/�v�_���\��9��7*Y<S������x-%��$ߌ�Q��@���vS�X&Ւ)3�r���0f�p�O�Gax����2����/q��c�6��Y;5$	�������[��-z���G�z'�>꥜�S��~U�b�v���^ue�U�F��χJ��1$2Z��p\
�j���Xu>�Cx#��C�*2İ�N����//s�!+�����̰�bU�R�X_��c���W_э#l�g��Db�ϴ٤z�3��+2�`[�b@�M�8c  ��#`�.��f�^B��Vȸ��w>u?G˭۲��|�+��*�#Ke@�L���{����u��}�@X�!����b�Q����n/�J��R$�W���]����}��tp@�&`�V�03}�|���vE��A�u94�z�4��>(��Q�i�c�Y���SjL/�b�[������-��{_P��e*o�﷒�1�lf�L^�����rx�}���g�=�
��g3��&�E���n�ʹy9���o�e���d(_���#HE`Z����f�� *���s�tʳ
�f��1�Vo%�@��Ѭ|�X%�**L.�-$rWI*��FCMA��4O�-5�$��ʻ%��퉜�d�s����6���`xhEq�]�,@�y�
Ln#����M!~vGb��̶��>v>e�KeG���%�����z� @X�!��҇c�P���4X���wz&\�P�p5)#�z�{��9�s����� �}��Z���TRЀj2��)O�V�97폌�Gb��*��4	l��� Xl��^>f�ե��^Ms{���x��Ezl�7�[��k~��;�����Zۣ��9}in
�jG������^Q6vt���v�w{e
v4_���Ֆ�rmi�en�/�y�8C�Z+����i���n�ٯ�;g����]�"D�@,q�Q�*2����][���k���W�lu1ˡ&.��ƔfiQz�n���В�V(Jc$4��R��u��l��Xş#!�ݮ�xm��C�n5��Ig�=}�q��n:�}_/��=� @X�!����p��.'�Jț��0�j�,�jAK�jĺ�.騅gB��J$`�@�f�U?��$�H�T(���;�bXV�;�R�h����9D��?�n ~_�'%"�o;�hcUM�Ro��v{�hSpT�^Z��U2
���\q�}����Í_�L�t��Y���j��J�i�>�g��]D��_ �52("j�y�B(vV����f᱓\��[�J"֖W��Ԛ_
^;�Uyo�MQV&������ue�����캞�|o�� P�4�        |!�m��c���  -USn8��$T!�nu����=���������覽�t
wn$����֙����$������p����Պ���W����8b�j�޳ܛ1��I�I`�����{�iz�aX5T!�(a�N�K{5�i�VA�v�Ӳ��,�q���aOq���IX���~ӏB�]��ŵ�p�^A=�7R()7F�_���B��6b.aZ>������/C���W��Y=,CG! �=tXJH�A��"��-*S͈+$ď�am�E��1w&�"^���D���pr�t����t!-�%�"�	w�o���
-��P�YUO^��c0�q�:��i�<��q��W+����	 P�3�      z!����a�М "�H��.�f]��uqE<��� ���~(�?�����p�6�LC�)ʥ����0��q����)������j]?��O�+�J�(P͵Y8>�IrQ���U����)4o�9��&����~�[:�gK�q;��z�4��eh�f�g��Œ�MtP!�*6-=�sVH����G��ML�����k�	"L�#,�蚑^��j��:�?Kn��}�}f��U&ϩ/W2O�7��v�Zw�ƺo��Oc�n�J��Z�j6{MV�[U�J�)�M>��cӝM���ĄΡΆ�B�����5r`��6�RċsA)��O�9U�� �.u��Y!jSku���3K�a��+����'>�@X�    �!�}ΐ��A\ !j
;�J�7��� ����~P�z>9>ʍ&_�e�=�]�2�v���a=�=���lTc;7��%mw�/�+���e�,��6����$�&�HO�7��!��d�ՆU���gJ`�4���&Uj��75��+-B���^���-�t�z&P�J��c}���
����'!���
��
�Z��I�Z�t���٘�C]���2��q��j�%"H2�v/|��a�'\ѿvi�,����zm���Ŀ*��ȹc1g��N��;�ә�N3~���޶�UeJ�}!ڲX��M�����#=Q�kOL�n�bX��oV�rA����'/�����`��$�(e��e
m�����V{��i,2�*)@����9�
��x�ڢ[åFK��8de��;\��X|'hľtu�#M�J���U��qUR���8����*��R�ݾ�RO�5*��!�M{�"G8�bDғ���H����Xx
�y_�JټB�:�Ưa)D-�#ee�x���+��nj�T.ˣ*��*��2�w���Wɪ;�]�~�o�� P�9!�Ͷ�b�ؠ,3��%�#�����޺�*�d�Q�{d�%�.E�����g���)M-S�>�La�tE�p-mJb�m_v����
G�'��a���d����XgS���~���q ��|!����a�X�tV
��slL3�p�}Vb5�GO�����0����y�1�#g����P�v�p��!�9$�F�?T���)��>�(\���Q7�4k
|����W�����WPEn�v꽫^���w�e���w9��
�'A��4VY��+�9
��&%��Y��6z���JߑS�q,-2"�.B������j{	����5;��'`m�9mޚ9e��&/��J���}���
�$��`�b��l����
f���.�#�*�
�i��p '�ԍ�w�#f�<3�uuE$���f��'^�j�1�*�*���a�*���x����N�@�>��!����b�P���#-�ZT*�ֱb� ���$:ђ��\��չ���
�4�D��<��h�\'����\
�N��~�ϙA6��Xcw���A�9�.���<�5z.?$��'�����):��]^:W�SvB���M����$Vl]�[��G��������m�_X|ev}�F�zb��{x:J��o���dg�w��{���k{gIu�q�*, �j��$t�f��7b��Ǟ��Oo9H�g�8��_�e�vtC���(��_�Ӽ���+.є󷘵K�KڍpE>��o���,����M�w�,4H�ɪ�{�ah����b��O�ز���B� v���N��.խ�a�A,����=5�-�m�<��S�VJn��>��Wk�k�@ʳkR�0����k��\8�D7���5>Pr�N����Ψ`���v�M��    P�Ԁ:�� ;!��Ήc��anX�3^�O$HT�G�V#D@<�-��?�>ؗZZܛ��J����]�/k����������I�Q��?�&h���s�`�\%_��ȋ��gG���"Ǎ�[�#�{�޿FT�
(t�CH�l����>>��>��!�}daQ�� ,5�S��������
��I�ߣuZ�#&��h�wTe������/�?���J3[P �{��
(H�ա	�,�M�L�W�2wW���z�g�!,��!F���	�~׃�u}�/~�y�r��kλ���T��6�f�Yx�Y�̽>�
��Y)Z�s�.lV�4QB?Z�|"���{m_���~~D�q7��#h�g��F�	;�6O ���u�;ϱ� P�9!����a�Y)0W(T��5
D�5 �&�����I<(TΞ����2�[r�
�m�C]�Z[y�k�a��tݴ;���7�����rbF�Ǳ��Q���Xǲ.�?ݥ����r ��!����caQXT7�q�[!��ԫ���XBZB$�Ҫ�T��@9m�m�N��o~�~S��Cfa=b}+��ܟ��Y��=��{�z+���j��v��;��3ֳ�)����|�>�-ׅ��$��oy��������ݠkZCuK��X������1��ƹ�v�թB���\9{�.�Q�|0�����*!t�k� �[���v�?��o{U�Q���
"�s��y�'����iF�:c,3��S͌�~L�鋫�
�y:�
i��թ̔)u:��H.�V���Fn{���b*�I �DXZ������ ��w!��ʇe�0�n	�Zg=SΈ��NE����6���@`'�9:{��ߩf����|kV�1ݦ��[����<����wH,�}%�궨��-7@!�����n/u�Y�]m�,�ۦ��-�����t�f���;�_�۟���1��rmP���q1�[�#}�r�ãH��}�:�3�� &u$i�\�m�Q\*/AA)m>��Q%<��ֶYm�z��pǂyU���v�ƃ-�w8v�>�����甚������
/��V�k�n�=>���W�TeԽC2�vV���M9��(��[��轒��	�-�+evK����M}���z��x�Qx�Q�b�BD������NҰ���_>�%F٭�hv���!��ʉda�XT7	4���Ƣ.��q���S�i���Q��{�3������>�s����=l+en�j����Ә`�N*֚����~S�sfߋ�0�}�ʣ0�چ>��ȹ_��*�Y\���ӽ�`ܲ��)��5�\6}�oƌl�?�����+��2�hb����T��xr^A<�a��n�*:D�����8������s�C測VǞ��e�BOQ&h٫��ZqT'���G���2L�ؔ��.'t�7�TL�z�i��W�+��r��ӳg���GF_ѷ��
��W�4l焙r�c&{vRIe�����n��	��Z��z��
3�� J���vf��uD��o�,84�Ȗ׌�n{�s�[Gqʡî�|�,���οI;�ݥx�BZ,Z΂��(=H����yV�G������v����$�4��w�%��O�5��p����*6W�߮�u��}�㞑� }c!����a�Xhv*C
��
�>sOH������e;!{/#^�F�;o���Z&f���޷W�x~�� P�?!����a�0�nd+C.�YE�,��w0%����������˃��ڨ1Hg��74=�ĲRd�N:�v=u�8I3����b=���\X�m8���{�R	�?��n�ފ�|:
)�
��9J�f��߸�H�9?��%v�Ub��	�K�մ"�PA��JϞ��x��a��qj��ڭs!��"�'���4l�x�b�����w�<�|,/�z�Ljm����	 $dJz�,�֍A��8�-����u������f�&�ݖ��C�O�l�Jw��t�������!����+��t��Fڗ�yh��M���"J%nqR���ֽf5�f���t'�0�o��:Hh(iݝ�tf�)�̪����5���*L�4FV�[,G�ߐr�j<���,��q�7+uxW�diVs�\֬�������;�c���&�:7��u�p9�|{�Uj�1��=�$�?���ws�����!I�4���&ML��]#����!�x��~ǯ�s�6,�`qLn�=7<���ء!
��w_W�ӄ8ۊ�%#�ܴ�w��bz'���޻<�&��,9Ń*�0��>����JN�6�"�6R�
dn_��u��u�\ڳ�� �j]꿴��ٽ�m��������p'�f]w�9�4J��[��lB�jN�w���(FC7U ��b&��Ů�C����I/�5]�9�p�OWY;*��`�\��-M����1���p|T��KƤ���
�e��4\:��QA[8cN_��z�A���b6e$�ڟ�������`
 ��!�����0�j	���������E8��G���,`Q5i��3�,`f~3�����'��;�����g��=W�����ʇ�%�ы6O�Y���5�5X<Ҋ�]�^!���ɒ���K��M`��]�j�p����x���w2)��=�}�_����7]T�6ث�yLwxR�4,��%C�-CA��ec@ɶ�6���s�B�kڗJ�zG��1���r�X�$6)�)��I_�y�(��e��0�Jy��s�0���u��;%":����x.N���TCB���ZI�ό�uaW�C��ua��F��L��9
����j~2pl�vt3����X���`~$���v�v�'���~���] (�!����a�@�P7Y�I��A61��aZa�G�m!p�"��Ǒ-Z��e؆'u3U�
 ��!��ʉa���n j(گ��,�R�3��$$J��?�POH��$btnΞ~ρ�s�Y�z�y�ǵ]�UCh�Y�p�N��xn���ۦ�����䪽yI�x�A^���3�+'jBˡz�n�ȍūD��*j��bf.�^�y'췙�'l4�6���V���}�e�ηN��"`A��a'�3rG$����0�y���+��ߞ�p 3��k�����v��A[&gѲ�H,*����fLKP�	ܴ8��HmSI�����S�b:c��|*�����;�	�je8��ηn%R�e�Kd?I�#�1�}Sp�Ǒ��y�r��Юf�MtgCV$ЌTj8�lC�9����(J�پF(g�ts��=�A�#���Gk�@X�!�uޖ�@@j;�_P��@!�%���H�C*PRX�Q*�!���'?B_���#� r�q ��u����k�y�2����;�9��x~�w�?5J�&�YὮ��%��~D�
 ��!����a�B�NZ��TX0�2ePU4}@�t��BE~����Fs�^l�g���^��
��m��a�7K$�x���=�z��8�`�ߓ�8�>5>�ң���f�^oORL��8����{���;��x�s]G�IA�t~�%��_�����e��F�/�����-��V+��ܘ��\�(��{58�]
u��k*��CML��h�:���d9$���N��lnD�l�H{	*�����7�?��O�_�hXϏ����
������ѧ�}_w��s���%Q�}
 ��!��c�A�  �1��ޯ���uR�!���G�IAͽ��xz-�vO���ԓ�&*�/`��B�<U�	���Rf?�5�۪$��3V�wUۻ6�����ƷY�ex�l��V��A�ٱ��oWZ��'�'����%���T7$�[�&EW�F�LF`��?�^��[��k���]lc$v�4�އ5�?�8B�{ȃ-���֌���+ӂp���X�I�k3	��Z��WL�6�����Bf0�*,��>�=!)�z�[d��cVұm%
 ��!�Ͳ�b��(n��B����d֥.�
�y��( 8�pz[>�s!�w���cm5�������tc��Kn@�F��%U�+;�G����x��3�"B���r�Ģ4��e��9�Mr�u�*^c�e�k�ɺ�T��:F����Y`&�ԟ��lR�v��sO�>��D���5�o��aJ�̈́$|z���k۴f	n�i�"��Cu�Z��e�OZ>��n��/����w.-�齨�6]��|��[f[Zr�S�V?u>��u������"q��X���Q*CN��F�c9A Q) %e�91+�Gp���D�组�|���9�ћ6o����j�qګ�Ɯr)���5�?�
 ��!����a��@@�Z��kZȒ(<�7�=?A��"n��3��$ɢ���K�4ö�H�-�Qn���ښ��CN�̳l��~��
�lZ~�\&u��ԩ�#��������m��s(8E�����bz%��W"�OLg�j��ZZl<��sL�[��h�5He���!��-f�&������isq�.ϼŞ��EvP�W���7ذ\���tdwz̚ѫ�����qqm�L]?��gz��#P9���א�;�x��%΁b�Ac!5�.$�[��c�q�R6z�`���k��N�����;B�����$X��;�~n��(�>��!����c��@@8L�/K�����+ � Ce������:��?H�+꼮|E��ܫl�:�Cě�l���sAC�l���Tno�oM��uU��'`��J������h���,_��q����m�V�
�H%^���N��4��9����m��1e��;�gTU0F�P�׏������4�˔�Wx��,�'6�yߕ�R⩱}�-�;t����P��GوG,�Nǰ�A�oN��
 ��!����a���n%�L]�iC&�jA*�%]��'�L�~O�����H���� A�#��?�4��Kt�ܱGBKj�ػ>U�sN����ݴm�[���W-�0��m�F���ݒ��B��pV�(�y�3o�j��ڳ�i����=i[e��d�n�=�rK�4pH0uj�p}�m�ݰ���4V��F�0�Q9f̕�f%����E# r �=q�ܨ��yZ���g��_
 ��!����b��@@٦�K*�zZUfvf�W����ryn=\@��mS��P U߾��Qn4�g�n�!�CdE�d�낻���ô�,$p0,��s�
$0��,xiW�z�v���*#�q�+jL��"���ZM��ŗ_E��ˉ'IPǲf�m�r��Ӹ�5@��!����b��(N^/M���֪�"�z=21���FC�e�a�y����#8��j�
,���������˹�z�M���^���*�ףX~/��ho4�AO�֞���n7%����uU��G�V8�������V0j����N�����--�<��+r�^��A3�q��5$�LL����9VU|K�٦$2ĤQ6d��#����U	�ǐ���d�wJ+X�Ht�궃R2�8N���
[���m����X
L�n���\�Hذz��Ʃ�[fJe�R�*i��Y ������a����dR8���W����>��!�}b�Q`�-%��+#�R�s�
5�$�(V �Th��f��D���ҹKC���?��V
R�`��}^{hW#c�c{~�a������5l�ފ�n�X�>=���jY<�Vګ���y<�����X��pȘ^��v�&�L���t8x_l;����=�a�k}o��ȉ�"��J}�C2�S4��R��T��d��'�%Р�;�H��g�<J�i��^ںo�F&�_!4�j���2�mT��7�	n����.��a��R{��1��t�ߔġ[�H�����Ij#��2�*m\������r44Xl"�O��Wu�HRkQ���=;0N ��-k��קӝz��>��!�}��c�8@AZ�%�\P6ִ$�6q�L�2
�xX��;�L�KA�2e�}��_�f=$A�7�sj�S�,�"'����������v�V��@�'��!���T5"��|Ht�9�v��y���|�2�S~�[���'�r��T��I��f������|��e���m.l�i�������:Ҍh��,����� 4D��7`�ÀE�]��E��ܺ�[L湁��R���/�3}�jR�׊h�ze^A\q/�v���X#�BꘙY����������&^�Lz��]��;�j0��\���H���J}�q&a��y���t���6i.��,OO5�d����.����S�!���J��"�A�ԟ{�a�� ��y!�}΋c��h�"���ւ�T�$J�j�y4�y3*B���/���{�,Qm�`���%5Mo'��>+�NH�4l�u���������z��1�[����A���㈷�����3���HS�3�u���@��Z�j�TM��C�����U��� �E�=J��vs��Ӟ55M9��}ٿk�����q�Sd	����L����Fh�0�$}(Sb�	I��S�W`��[�� xR��T�p~"��g|��b�;�5\�V���iCԁ�4���7�t����wi�Bӭ�}r8r:i�%�H�>��E���:Ct�-���L�`� H�Bتoq�=VCc���c�X�h�j������aS"N!'G��ϑ]!*�j��|
����� P�?!��΋b�� �h[�NK��_.���#�q�퐝P��AMX�&R�z��)]&��<E�q�`n�������P|w��T
��^�\!b�т��]A�z�j���ea{W�jm8 3�!�%�~��%W���$*��6n}aUtl���{��U�a6YdU�յW^^߽6�jr��[��<~`
 ��   1����             0���4��#IXN<v�so?  *��   �!��7�         o�1#Ď��yK<��XFg*>�����\$9�<��r!�  ���{�`\��_e����q��� E�U�;����*2D�LQx�;�m�ߓ�_cM�wF^
�8s�]�p��4�����@c�q�m�������d   4�7��        D
!��҇caP�.M�A��g
��Ǘ/5"�<q:�L(P�� �P��2c%r(rU"׃#Q�-��N���c_w֨vR}_��wF������l�:�
��"crm3$�v^�����8��t���I8�]�1Շ�n��Q�I`A�𫙥ѳV��ΡX0%q��.<jZ�Kg���l��~��˨���:{��<YVI)V�ҟ�2�!�FhB�Cie0�INn�F4�2n(����#q㽿�Fsw��/��Dr5��MR���S^��&�?������s�`@X�!����caQ �E.KD9kZ�\ʔ�b̎�JB�Ǻ��GVϤ�d���%�Ұ��_wU��)�t�ذ��vM]�_R���5fB˼\}Y�U���}%�1�N�R?%�U���G�j
kg�\��w�y��ԕ���䉦�\������gܕH�����u������߆�;l�C�s�Bp�>3��Z�@�r�͉!E+m�F����\I��%6���{)�R��$�Tf���.Rj�iE��>ME}���M��!�{&��ȴ�avL���F��R? ��!n�h�"�[EZ�q Bh(VJj]Zc�D��D�gKY. ��ooP�v��th�\⑃����Q�*�>l�Q�ǌֲ��O���[ P�;!����p��(�T�Z��g:��H����H;��5��N����U�ܚ�;�,&��)��<��n�9���"J��}C�Q����?�ﶦ�/��)>
�����8��8<o�mB�E�:�Kb�
����5D��h�����w�u3췩�F�	�_È��pv��5���|��E0�/�c��&˘"��[�Q[8�W��෿�O����5+�����J=nY�O��O��Z
r�i$�f>?���:@X�!����b��@@ȫb���tUn_%Y2`!ʂD#&����Ko�(�-�^�h�6%Q߭��jc��a#��)��jq؜t���x�5=?�g�������w�`�R�Կ���|	�{j@�%5����h�:�j
~�x1%^�~��3<��#?�B2H�tJ��~��8�t�.|�$:\Y�dk�H���zOB��Y�,��5��},�S�����FJ״�h����y4t�Ѩ��¢E_�ݥ�jp�+青Oa���eH%�
�+A�z��5�&��ԓ�Y�������I�ªd��f$��+8���CL4��R������ko�����&��2��B��hW�L$�Fi���UX{jD�k>�W���n�@X�   �!��Əb�P�  *�-.��k�T� ,�[h�Q��z�B_���m�/m�L��c�ճݮ���>�ّ5t[z�6K�1�I�
���:]a5
'T 7\QP�U��ɹc4����+�`)B<�!1�F8�F�4H�6���`��@��7N-��U�/-��ө�]!�L�n:R����v�Z�g�,����`'r�_�o�� P�5          u!����b� `�

��r5�N
FSϠ�3@_e���o���3��AXgǷ�wp���~�̍!���G.���0ô��}�4J쩛j�������\�r�?)�7g��u��/�@��1�O�j��;퇪��?��]t�P�1  !�ծ�b�� '�<	h&s}\k	Fx�Cr�១%Ej���_��dW@����N�oe�Hh�_f�q�τ��W�w�32x�z���ߌGa0P|��7�y����V=;k7��6�js��S���;���%`|$�;f����N���̳��f.�N��s�P+@������U`�e*�&M|i�K!��}1J�6�	>�}.6�> �ٮ����,y `j��>�v��j���tD<qb^
 ��`     !����a�C  J�V�d���.�(���>V�?ȗMF{���O�ٓ�L���B�2V��Ko1��g�X5�V�����<�����2������I�S�����$��S��ew�%�o�ݟH�MˁQ^�,ۧ�U��Tk�^���~sҟ��B�.}%�zM�NH��^o�����>Y�_�A)њ��N���e�z
]`�nZH�c�*�V�]��84{L��M�.o#��n��+����#�������ŷ|���w�U���LH���mm�S�P�M=ELq|Z���_cd��	���`ˢ�T���w�j�!H�����ΫYq�qe�j��~1*�]���=S�zh��x~��=� P�2�    }!����a���n4�{�kW��J���"�� '|gM`Ȯ��@K�5'��/�c��ɿ���-�*�������|}�����te�{.s�϶�I;x�l=Gbb3��7�����~*���s�x���?Mr�b*�\
d�^j��B��������8�������#���i��:fH�QXO;2=u<�Dc$L^� 7J�"R��:�H,��T�/>K=�oTWB/�!
~�����ȳ��]� ��<KCm~�����V��i���n���T�+�N��>T�{x�y��̃K{Uo��́����ʽVU[����p�
�I�ik\5V���4����� ���lf�pb�GFSiQ���F�b��g��L�)i1�� [[G&�t�bF�n�Y;O����YJ����U7'� �)2��xv�f!�h�Q@5�u=	�����R�K(�+'���ӗ�T�P�>!����c����'-��.�J��z�**Z�yCh��RT݂��WY6/�Ja�u�H}n|ڏ�y��c��;v�Լ?f�}+�kM�=�r��>�曧X�{nQ��m�20;ժ�`�yMW�<���}s]�^���<Ky���%�9t*�B����vUM�ߛo�C��E�ﯣ[bi'�#�ţ�O�6[�e�-*�>
�|��XO��r`}+��ė�ؕM��;#tb�������E`�GN5�2ߤ숋j6�(�#t�m���\�%X�
�'��*�u9��~O��[��I,�:�t�R^:�5���#s=#�f����
�j�y�1*���oŕ=��j�9�%	E$YB-0�Q�L�Tg��;wV�#S��[�X�j|�7$dF��%�2��p����5��_7�}V����� P�8!����a�ؠ�C�LgP��b����t���&`�gCm�/E���ۄ��Cj������Z��U����x)?o��S�h}�ƒ��͡�Tɽ�>���Ri���/�5h��z]�F�t*��U�Х�U8p#��;r��=2{�����a�����S�����h~�Ҵ��ff�9t(ӕ����^�5׽�N�Z�<�!�gF��q78��N��_V|�Yo�XX��_��6��e���^�!�����$���I��cQ�G���N�6{��	���2e�SnކB�'i(;@?0�UT�6&�e��"���j��~=�x�~��i[c�QO�/6s"��"i�l����x��G������3� ��b  �!��a�A�N��,")T֭�R���V�uj+i��!�gk�L���,������ީ?7�3\���� �_ƔgNm<#�����]�ʎ~��rM�'�s�ʧ���!��\�z��ʌ�h|�ʯ'�Q��W�v�)ǍY�
�ճ��e�ӛ<�H۠=��#��=��7�+�w�k[�!^�^��>��
p��MvԱ>Qh��d���U�j8�<z�F�V�c�g鴴�#\`ҟU��
 ��!�}��b�0�nU]��IU��")�(L�t��AX��dJ,֎ҥ�X��5�lR�����;��7%���#V�����a7�/��@�D�?o6���Ri2t�'9	�-U�*�UgN1�uN�9"پ�����c�ٵ�w���i���&���o̽�sk�����nj����^R��N��dV�y�k*��?�(���SZ�m�	��k����S�)Hr��GFs�I�`������1��)<6a��b�������gg�+QˏY��ȱũ���P�����,��QlaGN�P�[��ae^��|DP%����<֠ㅈ�bs�U!���R���hl3g1;m:�N:Q��S����EY��^����� }cx               %�@������6�~s�&���3Jg��}yh\��U�A8��J�K���YLs*l,�eOl�Xz\`P��o�s�g�a&������)�[�ȟ���q�y�'��(+8�|{
���ƞCc
c!u+�	p�/��K��kA�(5f�7Ne/�|��:<ܮ��4[ei�Ne�s���9�qk*���)0�?��E,��	#����#Vȓ����n���Ĳc��D�x,�u5��S_���"g0��;��n@ڼ�t]�'٤����F��:A�$��	� �9��8�C + <��5~sy�K�0���/�R_�q�]������A�I�l��������8-��B��ě��M�`�:�mh����@�l���q���q<R�ȍ��C�f~��GG8�fvT��w�<��P8�J�QKT%����a�ח�O[c��I��l�E�Ø���2l�c��%(��!���h
�]w�!�ֽ�R�ɧ����)t���&��A�<lzr�Q)q�K�sl����'8}���� �[��|�4�xA=�Lo�2u�P��*��W�v~K����5m���+�H݅����v�hWp�T����$��:d=_������H�tg����W�`�s�
d��G+�0���<m)��Ћ�ds� ���)�pե]��'���ѿ�G��^?M�|w��bO/Y���Eo��ߞ�����Zt�L��L�ˋhܘ�\	W�b
��L����z�9#�V?��F`���,�\�wЩ=��?��E�_�`C�B[�O�U�������Kލ�n���r�elIe���8�ӑ̟o��w'y���{g�Q'U�ڟ�]��ҙs�m��k��c�=e��!�i��e��}SPv�/),&�
�,�p4���Mfy�-�����XX��oE�)�(ğ��A=�n�zP�D����N���ߺ��&���!�c�G�������Rg=�n���N���NB���"lVD9�=.X����%eV6�[��,��G��N��2�/K��ƁzBR k�N�RD�9��;��o	U*�JA8�٥C��_���l(��٤�w1:3Ex��R؃E߉�!HC���l�6[��3*����8���f����wo��MP����2"�����zo.W9��4�?�z��� P��<wQ�t݃�/}V7�񣊯���ݩU��@g?>�d��^54������� ^L����lE~T͵P�T�YO;*�*a��I�h����ɪ��=\B�[̾x4�K�Qn�D���P 4�gCG�Ji!�Cs�w."�J13ǉ������u{Ō�q�l�j}�PJ(�.�mN�)��bR�Sl	�ق������|���\�!;�_�@j
�JHb����>�۫��E��²���۱���A [l�P�����SrR�� �	>>|�	M�@ڎ>���8_�s,4��(����V�IM�%ۙw�Z:y���~�k��O<�e�ڭ�E�?�i��-�f+��/KޯqPf���FXvS�d�K}U�����	��
�kR��RC���<�z!�9V�d5t�k֊
��Y@*˩_\��S�ͶSS��A�p��&����� GJ:����t��|T��!�e��A��й�1%��[�ك��ض����3*��|����%؛!��a�b�Guzɐ'q95S���ZE��<�Y�T��P��ga�9Y�~�6ot�ZF�^� ����X��\'Ƈ�H��8;=�ݿ��(��,��iM��m���3:�>m��'R�@$�B�Ӓ�!t�H�h�ڳ���ʄ�wc���#�|J:��s#�K�;Ń7I���i�3�eQJ"��gk�����b�[�T�� �UJ�5X�zC��-�V�i��)O|�v>���Af��c����H�=lW�T�	/�Հ�����bB�G�L��<>�(Ŷ<�����}W^�x�ib+����H���`�Z��ea�rQIw��@���CW�X���&���σ�>��/Z8P��#\'à
���e�9��7zв�;�$��皖�� m��c�K"ґ���o��	\Ŗ�����5ڗl6�;C�Sb
IlC� ���>4ۂ{��6�B2�ȕפ��~�P���Q��։�����j�Ǝs<pj�8�(v?��H�{�[드�����zη��vt��Q4�3ؒZyQs	r���0�z�`�ۤ�V��;V�
׹�?��Xb��L�a�����q0v��q���X�Hx��|o�f�;�,�0,��F@j�(R9�����젮5H8G
i�Y[��+�p˥c� �屠�����ɉku�YjZ����%�Dx��,dg0֝�yb6��eħ<��z��Q���Ǵ����N��8�m�iz���(.tU�~���1��Z!��i�m�L�>z�Q����*������9nx)���#v�n<wo��7O|�9�_w��}��<��^�W���k7�*Oi�~�+v��Z%,xkA�}\�D�p]y;�>� �H��
 ,!\s->�3Ȟ`��Ѱ����1�Э���O�T�U'������HC��T
��ugv�8��?����1�:��<�ex�o��:nt�#�'Te���æ�[`���f�T�B"���������0����A(YЫ0T��$d�W��]k���^�9;NFt��tIEa��I>�	)"O��R{���yr��v/�O�?�\�w8��]b���8�ي|�l�b5\�҄f� ��Y5�_��o��i��������p��G����f�v9kxX��)Լ��C
:���f��ŭ�:��
�&2Fs�et49�E%y��f������'B��N-a�c' IB��A���3��>�����Q�R��I�{�#9�0��
�T�(�=�%�l
�%��o3-��A�X4�r�U�t�i������O,o�N`�=5�~�oӠ����&�����J��.MոϞ��ٚ+@H���D�Ž�˃'�v���ߴDo�[�I�Z�9�hd�7Xi���e|5,KtT('�^�W��Ec���k��\��X*+
��C1��u�G/�ӣ�R�_��F^�~���Bv����Egvƈ�hg�I͇&������M�%/1PE��0]l�ej��tr&$v ����=��Vu�y纭	\�f�9e��[��y(a���<��y�(�������Bv��`������&���;�������/
 o^�8�
�l����F���*
u"�p�r�?�%
�wqk���- �坂��G����A$������h�bz�M��cw4h~�0������:Ft�@u!α�lA��!c��na�Q)�G�`H�1U�5��4Cx\�*�#=�,�m!4*�i�&<8��'��|��n���^���K��q�Ӆzjg�a1x���z��>U�ܽ�p\cT�b1�#��z��������Ge�+��:JVP�P[�ul<�v��O��(�{�A7N)���d����
;��=��R��C�V�%Ђ?y�W�Q����Bo�vFX;�Ƹ�S�e��t�5���� ��ߟN��(��q�}?FM��/��\
������q���Z'��� �
6�|���K����S�����Q�%����`��n�m"{<&�ޒ9��Ν�q����4q�������
�U�so��C
���.�d/�&3���-��ʹu���X�VOeT��~�d�e�ǟ���n��i�u)�$vҚK���L���4���f�\� ����,��ڸQ[��r��&B�i��Ν�\,���g_�5�(�xXGy<��c�2�˻���}A�Z��Z�QY��<쎁��|��v������(QEu17'�*f?o=M7=�@Cw4Aa�i��M4�Oʚ��8IXޱ�@M$Ǧ��E?�F�D���V�����*]9s��i*K�b��p;����s��H@��k��(��$��)|q�pF�J��c͞t(�/�����@/��y9Iĉ
d�uc�}�ړ0�[��E�〣S�R�y�%;�{��?֌'�3��Сc�a��8r/i��	(��2
�'���t�|s���J�䟺�z�"��]A��9��<���PA�ח�d���t�����7�FJY���t�G/�5�^@�\�?�{J��a�}�v����0��ӟ��re��D(q�-�<�li5��﹇�Z��l�&�}Q�5N
����?h�h�c8�f�<
�L�ã-V��ԧÿ��5)X�lk������h4���õu�\��G��O��u�ר}����j��uEO#Ȝ҉�y�����q�B}��?;t���%�{�����H��Y/V"���>0��^�h�_��<iM���p�'�9�P榕.���\<s��ƫ�O�5����S��l�i?��kUwO$apuY������7�G�Q����_PiGL�[9g
x�Y=������\�Ո%u5+DiȖﻑT�xU�Y<F�{���XI �)	�*M��7�0�������ȴ)BC�ˁ�`��|t���f5֘oQ�L��x����čb��/��L0w	�z?g����ty�܇uK����&ؔ�� J��'(A�@=�92��n���|ծb���T�5���s	�m��Ju"4�&�A�l��(�*|���"�ˉс�oe"I7�Џ!��a�mJ g
�M�>ז��!���j�2Xb+)�%(�
`s����7L�2�����B���rp!p���a΁�;
�yc$݂�*��Cb�Z�*umff�5���m�ͭ��P���r�Fd3nH��أ���SD>�$�t�-�6^6��c]׾���T�&�q
����\��!��%��͛B@���Q������p�x�W��-�8�+S_@ѫHh���Q��&�܀�]D���8�k�5gB�G��t�� �"��ek��+#�*v%��	���,t����Z��������O.o���6�acP� �	�o�s+���JC���ε��g� ���U����ÉT����{
!��	�M���#�܈T��q,!' �f{�N��On[-x����W ���"R�C��*^���S���vP^���
#����7�����؝S��E��jfF'^9 f~��+Hz��`��^���:�L�?&�e7�3��H՛��Ga���Z�Z����L�ד�и:uc�X^��tY=|�s`�I�8�=��,��Hmɶf~
U����8�G��Nܖ���73���N���lQjlk躡ƈ��u�e��Ғ[� l{��~�YhI��^��ߊ}&�d���z��vI�-YT���[�_�-Vx':���ӑF6���_� �6�96܌/���V�PLж-ZZCP�՜:E����"�t�wR��Z���,e��)��9��-!5I�~S��|�:|@��J1��ݤ礘���cb>�b)��.W��J�b��\�bF
)2�=�}��'�d���G����
�^�����睂P��M?XN �2P�{C�ړ,�Za�϶�lwd�g���J)��o�C�2=������̫�S�>4E2��
j�S����3����c���0�
�-U�o��pN���s���;��V��i�g׃`��Q��>%=��;%�3�uՎ��
�D��G��ÌWW9������$�VʋeE�?�)���P�g��Hg�xz@l�-���s.�$H+S�8����dŲ3�!>,��޿���C��| Ѕ���Q]x��К����[G����Uy�*yl'��*��2/U~���m�s�V~�F�I�*������Kr����ImT���Ik��C��2�E��-j⯕O����Yl�XI#��2������	1�dS~&�'�>b몗�����?!:H�b����A���Q��
�{�j0���R�
�?b���W����x[01�>���Y��!�j-���}iW�I=3�)m�F��L�B���`
�t6��ۀ���`���'�ӎX��>�̤~X��@r����xu���r��w���[G|q5�����}֩�!�	��O�{�d��^�y�s�I�B`oOed�ۑ�H �����@�Ry[������yf<s7U�Q��J�X��~�Ơ��Ag7xЀ��5a���̞ۏi�m�6��)7)���R���wMZŃ�i-������N�I���}j�|�C�#����An�yr�� �D�����/9�^$��۬7BB����q��/]v3Z�S��ܟ1�=6D�$���bi�g5|�n�[�$t|{5����3��CH�|�*����?������x:3��ߴ�R�Y�̀�Gʉf���g��u��6�����F�+-$���-A�)=p�~	=�4�Ix��2o�'ѩ:��L-�xU|��]~��ð*1hkV҉�v��(⤏|Ւ���C��-z���i0�zh,��eb��b��{O��i]�ǢCP(s���A��=,ܖ�q���{�/�"��&�SD�ĿV����q��Y'E>�S%�0���K�U$�)�zq�Z��#�e��R�������7H3�*(���M�N�2�5%ѽ�!����C��u�]����ҕ�H�[�I?�oX�5
�.t8(�Fײ0�j�Ewd�|��S��)E��GOj�;*�Y�m�
$D^�UN~���-ѻ��/�ׯ[Q�&�|�0AH���֭$��i�I�3ޡ�p ���:C �q%��̞~�=��	sSo��1�
��ưs�6��~EK��茴�F'�!Q0W�5�	��0�oK7I���DM���p��K@q��3<�eip��H��W�͎���n�Q,�$Q�ԛ«|�;ǔ\�5�ؙL�Aa�A=�C����d䀛q�X�W�Gf2���I�d(M@|���fy���������r&\>�u 9z��[C� D��v�����nނ�f�����������Z;�>i�Ha"hd��*���6���P@R'Z�7ʤ���S��?-�Ϙ'l��_\j�\i<\0��T��4�v����x� \���"8w8V�a�y�%�H�7��Ň��:���9��Ӫ�F\W�,�j��U��=���
@G׆�����r������)���6�"�ꭍ��y�+Ƴ=HyՎuNT�m�e�������4��	�9�"��jyH7w���W���
�°n����8�Exf|t��Gk#�Y��Ɩ��6���2{����VV��Ѫ�a �:*�wFS�!w�ϣ���@���G�QWI�(̋�y%W'3�f��E�;b�H��ٽ���=��d���7Ꮝ���!6&0	U�B��
������U��6�`
�?6�rA�%�A໭������Z�j��B��!�_�F��,^.+��#�$Yt��a��R�>��gJ{0�/�L�P"����]H����~AdB��-}�����8}-Q�[����G���`�_&[(I�;>d�Ӈ�e�H%ӈ��d�	v��B��t�m�Q��x��,�I^�B�3�d]���M�v-�s;�F����$����+j�Lt"%>�ѱW!4���Meʳ�3�Rj�����������i��#-v��k�&,8���2�@\�oo�Y!V̄�\A�X!��x1���ǎ�I�z#
�.��؇�mU��d���lu1�n�^*��z|�R}gͼ��U����ʂ.�� �g ! ��)�2��/����
=�<�*V�5�vɑs��Bx��ç(�%cL?'�F��*<�����vU�3�;�Z�~�լJt3��e�����H��m��!%�����a�<��+���s}�G�ϔx�qj��'�9<x�g��o�2��/���5�����ԑ��lfR���-B�"j,E�C`:JbQ�ǑvZ7k���܈�p�#�F��O�6��6�L���Q�F��l�۳�DuK0�K�{
�fe+��8j����'�r��'2�b���z���Pl=Nm�x��ỗ�r�����rN�	ڇ���>�NXNs��$���1u�{�h����Я�'E��M�o�w�C�c�/E��W����=XY���IG)���p����%��-q�|}���?=���Z�;��ַ��y�� �t�:3qJ���N]]P��|���ݪQ�?*�� �$����S��1n1����,�= �R�r����f���XB(��i�KS���v�b!Gå�7� 
�#���&��N;9\v8
b+��Mi"qIڠW�����vȐ�c�|�J�� BWb'���X���ܮ)����1�E����Ŀ'8$�̯Rn�۸���t�y��0FC<�źF"���b�[M��\V����P;d�Xc}�5Ͽ�:\ځl�?��b\�@k��p��~������;A�יbd1J�8,ԝ��t���k��c��,AD�Kwʊ����$NO��"SB�X����t�H�w�1A�ܙuھvMP
�Q,g��bYrH��1J��Fڠ�i�<*C��F<�<�j�����_*���X���
�,G�N0>��
JL�v�`�D���>{�B�}4g��/�?'p7�.�Nw����՛�%��������5�7Q�8�9�2N/�s�]MoA�Dv<�C�����OG�����O��ΈCrP�����*�J#��ԅe�����$��#�~V%�ɽ��P��N���'%�܇��)Ō��	L_j�~�Jo[�-�ٷ
*֎��ٞtȯ���t��z+i��qiK�4�]��9-"H�#��& 
@�PYy�.���6���2�V���]���Xi��O��oL?�]3��[4�݀�U-K�0��Z���k3�#�v�)�������$�p3��Q��|��u��z��h��q�YE����9�Թ���S�)&�����xj�Ů���1��|�M�{�6�P�@`4-�$w����
{^��3�V
��JL�_����3� !�-�� �YO��C�8��}����8(2䀟��x����7r���J�ʭE���g��#�e�K�ꁇ�2��~=`Y7�6�g}W�˟HbJ�aJ��p i�V�}N&���L����yg���0�ԕ�vV��T�3')���R�6��W��M����_�=�3��In;�����T�n3�K`����7��" �^�"����r��Ţ4�B����>��0�� ���4�К��7W���3�5�L�
����z�"a�+f����U�073K��\��f3��#ʼ2�{Þ
4,��=s������,�Z�[>e��$�恌�}�n� Š;�� �<;ô�T�tE�@��
�j3b7�#�������o9����5�UF�P%���<�@�<A��v�Xt%x���C��	O�ƙN�,�q�dۧ�'���{}����n����C5�v� 0���fK� ����m;��� �,�����e�Ϭ8�(n�/�!���7M�I,@�]b��ZC�U���栕��;�>����~�
��a��z�����3d9��[�b\hEL�`����{鞄�':u��g_��Y��f��f�JΎ�w\y��]�&�&K, z�n�=v�Z(|���I�Z��}7��?��e����3rRThm�D�ۜG��_Ε1I]��b�����t<�	;l��3���֑�~����l��Y
7���7r-�R��q�����e����r����x=2�>@��e�}�]-B�m��N�\[F?���;���*:��'��9��$ğ<@���_́f��tK�V�K�{���t���2�E�e��KM8�V���:*��&���zm���f��x�����x�#�?�Nr����0?�~rۿ���7UkPb�ԭ<���?k��bfX��4�	x���j,K����$�0�����A��l���W�n���W��-N��b�d0���qTQy|���E'0w�
Y4��<���"$F��lo�}�J��N��gR
�x��BڑU��2����������5��-�GԽ���e��u@ +��z]�������9G�����T���z��ug�ks@���K(��n����m���޻,��8`!��jȬ?�W_G&�"�jw���)��(����}�W�A
�
�xa|*83�V(�#�Ƒ�qT�W]�$eHć�c��>���u�2L"{]͠@o�����սy�oIQ�{/�?Z�G
K�fq�.��z�4����c�wX��7�<RӕA����h��X�3�Q�V�lu7����A���30$�dev�G��1>��@a�F4iH�>�b�eR�+�D2w<A��v��N�y����O�
m\��t({,#I��9�@����f�4`�/����䅔�L����O�H�����<a�e��D�S��7���W��Z�� 8����n��
$���}W,�ۢ��<�U���^aU%�c�HE�]]�{|�t�z�VAaB �e�����3��j.��M���mڝ�?�z�	���Bڸ�"(��v���y.�f���������'�6���Xm���I�u"�ԽT\>�>�sޞ�kً!rU�4ircrwv[t�-K�^��������0���͟U��i�޵)A{��}�h5�NY���0�9�^]����;�>V�-�>yÀ "�_�|�#S�����O�-�g�ڠ�7|)��4F5J���}U]�E& �"鏱ui���n_��b�#��y�G8�LH��h�M�S���Y�[θ�g1
*��L�R vT�M�I��{�  ��'�Gt(.�\O�Hg��l��A=��=,%y(d0���J����ѩ>�N���k��$�U
��cZ~혔��P|�1V9�Oq~槞�Fe
xV\=5�Fw�E�j�;ÉY䎭NtV�`ymӸ��i�mM����
����[rwn1.���:�Qk�U���~�d(���Fp ��b�aޯ#���
�8�]Ł�Q�\���w��<Q�t�;M��ta��-1�e�;6�� >7��⸲*���/c�P1�0��'���H��Pa�w�mMe�i���}b�
�pU�wH$,�e�I��F�WYŵ^ব�q���<�\�y	�z�UoD�<|�t���҉�V�3�%J��UH���:rՔ����7[EX�lJf���'��!D>����E�@XB�E�u4�4��Ͽ�a�D��&�3.�y�)�
������hՆIN˧��p~	�ޓm6�l�5�U����OE��'�Gg�N�e�7�F)�t��uZ��nA.7�A2�L�3���o�J���O��r�{w�����x���>�j 
5s�Z�ZI��ض�48���C�dE�I�P6�n�Y�Mϫ$m��*�<�ʚ�ɼ4����G����6�0�V�"}J:5�==*j�(��T�G�{�
�yo_*��e�}CՈ���ٔ��h��������Q=��^�/�f�YFx��Ʒ2e$��*W+���Δ��x�#x���H<V8U4�0�G�y��i��I��g���3LL�w��i�]����pT�f�?���Vr4�F�N��N��SUP;JT����2�G~@�` ?�7)� @j�
2{�����l��!鰛����+e|�/�?9��4�,���g� ����۽�����QPE�SJ�9I�!$��y��|��
���g��dXm���&v�����^Bp�1fN��K	�E��bS�x{���Jh��h��OƻSy��M�; 	��F���Tn_4<`n�koӂmm� �!�P����l&8��C����\��:����ߘ�H��W�8a���~P����N:��b���0
�[3w#�[ ���Qn����o(��v����X�U����8B�ň���qJ��s�A�����f��׵�}W9iB��CU�gե�Lr�+W��)_�¡��Ud��N&��?��f=���@Qr�4�AX)��x�.��n��ޑ���mz��Baؒ)Rkz��,}�>�������\�m��6I7��_��%���ќ.�˼�f�e��M��n֩�����+B�b�JQ"a=k����������� �~�xF����zS�t���L���uL܊"]4M �L �&b��.��4��XK>��}.�����
=O`�S�%j���L5�Z�g���f��e.�>9P!��/	s�����[���
1N{� �'���W���D��2�������	��g�)��ؽx+ӵ��Ye�K�f�^\���Qo/�w} �Y�T�4!y���6�;	���������A;�g��ZBD������Ca�ű��~"*2���Y]���K�Ք$h���pXs!,J��w]v3if��8wF+��T:��b�@�/�YaÊciK���[Li�g�9X.=�m�������D#���DϞ<��A8�:|���^��|a*V��Xu���w����?tH�2��&�Z��Q����Y�ZG��O\�,X�R�J
���X60ÿ��@�1EUM��l�n�ժ�}�H])������r3�x0qRR�`��9Q1y�M�`1��{�r��2���=�Ag�@�[�o�*��=adN�~�g�%ǭI�L
f�aL(�Y��03�Q�h�������ZX�AX����@U q�1-�wW�%� "!��f��D�85�Tq\�ӼG	H{��2���1{c ��P�E���z_2�,
���W�M�y����-@���2	c���cgϷq�`t���z�Me)�h�������U� �xY��kح����ޠ�`�1f�IQ�4����
�m$�w3d�q@�*������rݮ��7��e^+�XN���𲺥��4�߃���ҡ��l����3WF�:���]�<��xnO���n*]��:Ms@���-���]{���G��T�'�K�m�Ћ��:x��(�n�z{�r5�|�$��BI��=�-'�\{����ȵ9�<|*�~����<v�JM#,�V���[˙+����N1�TS)������XSR�sv@d��]�����gL��L})kz ,�� J} !3eZ�&�~^�v߰B��gXb�^\����V}!��J�{��$�t�{�3=��CN�"�?�k��ge���R�(B��[}�bgLj�=e���ݔ�fP�8oN��v���dG�8�Sm%]�`n/ZD5�&m(�&}�]����-3�1Ń
��%.^�dF���i5��e���ļT�0�P�<[>D4�(�js�IR��'�!O��Ȃ�1;�a;�~����r�{�%�K!?' ���=�*mC��3B,����[�MX>1˲��~3j���h*�j�?�g��b���S���<"W8|ʁ7��w������(]��z�3,3G�s�=U��