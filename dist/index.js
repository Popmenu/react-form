'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function useAsyncDebounce(defaultFn) {
  var defaultWait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var debounceRef = React.useRef({});
  debounceRef.current.defaultFn = defaultFn;
  debounceRef.current.defaultWait = defaultWait;
  var debounce = React.useCallback(async function () {
    var fn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : debounceRef.current.defaultFn;
    var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : debounceRef.current.defaultWait;

    if (!debounceRef.current.promise) {
      debounceRef.current.promise = new Promise(function (resolve, reject) {
        debounceRef.current.resolve = resolve;
        debounceRef.current.reject = reject;
      });
    }

    if (debounceRef.current.timeout) {
      clearTimeout(debounceRef.current.timeout);
    }

    debounceRef.current.timeout = setTimeout(async function () {
      delete debounceRef.current.timeout;

      try {
        debounceRef.current.resolve((await fn()));
      } catch (err) {
        debounceRef.current.reject(err);
      } finally {
        delete debounceRef.current.promise;
        delete debounceRef.current.resolve;
        delete debounceRef.current.reject;
      }
    }, wait);
    return debounceRef.current.promise;
  }, []);
  return debounce;
}

var formContext = React.createContext();
function FormContextProvider(_ref) {
  var value = _ref.value,
      children = _ref.children;
  return React.createElement(formContext.Provider, {
    value: value
  }, children);
}
function useFormContext(manualFormContext) {
  var formApi = React.useContext(formContext);

  if (manualFormContext) {
    return manualFormContext;
  }

  if (!formApi) {
    throw new Error("You are trying to use the form API outside of a form!");
  }

  return formApi;
}

function useFormElement(contextValue) {
  var FormRef = React.useRef();
  var FormApiRef = React.useRef();
  FormApiRef.current = contextValue; // Create a new form element

  if (!FormRef.current) {
    FormRef.current = function Form(_ref) {
      var children = _ref.children,
          noFormElement = _ref.noFormElement,
          rest = _objectWithoutProperties(_ref, ["children", "noFormElement"]);

      var _FormApiRef$current = FormApiRef.current,
          handleSubmit = _FormApiRef$current.handleSubmit,
          isSubmitting = _FormApiRef$current.meta.isSubmitting,
          debugForm = _FormApiRef$current.debugForm;
      return React.createElement(FormContextProvider, {
        value: FormApiRef.current
      }, noFormElement ? children : React.createElement("form", _extends({
        onSubmit: handleSubmit,
        disabled: isSubmitting
      }, rest), children, debugForm ? React.createElement("div", {
        style: {
          margin: '2rem 0'
        }
      }, React.createElement("div", {
        style: {
          fontWeight: 'bolder'
        }
      }, "Form State"), React.createElement("pre", null, React.createElement("code", null, JSON.stringify(_objectSpread({}, FormApiRef.current, {
        formContext: undefined
      }), safeStringifyReplace(new Set()), 2)))) : null));
    };
  } // Return the form element


  return FormRef.current;
}

function safeStringifyReplace(set) {
  return function (key, value) {
    if (_typeof(value) === 'object' || Array.isArray(value)) {
      if (set.has(value)) {
        return '(circular value)';
      }

      set.add(value);
    }

    return typeof value === 'function' ? undefined : value;
  };
}

function splitFormProps(_ref) {
  var field = _ref.field,
      defaultValue = _ref.defaultValue,
      defaultIsTouched = _ref.defaultIsTouched,
      defaultError = _ref.defaultError,
      defaultMeta = _ref.defaultMeta,
      validatePristine = _ref.validatePristine,
      validate = _ref.validate,
      onSubmit = _ref.onSubmit,
      defaultValues = _ref.defaultValues,
      filterValue = _ref.filterValue,
      debugForm = _ref.debugForm,
      rest = _objectWithoutProperties(_ref, ["field", "defaultValue", "defaultIsTouched", "defaultError", "defaultMeta", "validatePristine", "validate", "onSubmit", "defaultValues", "filterValue", "debugForm"]);

  return [field, {
    defaultValue: defaultValue,
    defaultIsTouched: defaultIsTouched,
    defaultError: defaultError,
    defaultMeta: defaultMeta,
    validatePristine: validatePristine,
    validate: validate,
    onSubmit: onSubmit,
    defaultValues: defaultValues,
    filterValue: filterValue,
    debugForm: debugForm
  }, rest];
} // Utils

function getBy(obj, path) {
  if (!path) {
    throw new Error('A path string is required to use getBy');
  }

  var pathArray = makePathArray(path);
  var pathObj = pathArray;
  return pathObj.reduce(function (current, pathPart) {
    if (typeof current !== 'undefined') {
      return current[pathPart];
    }

    return undefined;
  }, obj);
}
function setBy(obj, path, updater) {
  path = makePathArray(path);

  function doSet(parent) {
    if (!path.length) {
      return typeof updater === 'function' ? updater(parent) : updater;
    }

    var key = path.shift();

    if (typeof key === 'string') {
      if (_typeof(parent) === 'object') {
        return _objectSpread({}, parent, _defineProperty({}, key, doSet(parent[key])));
      }

      return _defineProperty({}, key, doSet());
    }

    if (typeof key === 'number') {
      if (Array.isArray(parent)) {
        var prefix = parent.slice(0, key);
        return [].concat(_toConsumableArray(prefix.length ? prefix : new Array(key)), [doSet(parent[key])], _toConsumableArray(parent.slice(key + 1)));
      }

      return [].concat(_toConsumableArray(new Array(key)), [doSet()]);
    }

    throw new Error('Uh oh!');
  }

  return doSet(obj);
}
function getFieldID(str) {
  return makePathArray(str).join('_');
}
var reFindNumbers0 = /^(\d*)$/gm;
var reFindNumbers1 = /\.(\d*)\./gm;
var reFindNumbers2 = /^(\d*)\./gm;
var reFindNumbers3 = /\.(\d*$)/gm;
var reFindMultiplePeriods = /\.{2,}/gm;

function makePathArray(str) {
  return str.replace('[', '.').replace(']', '').replace(reFindNumbers0, '__int__$1').replace(reFindNumbers1, '.__int__$1.').replace(reFindNumbers2, '__int__$1.').replace(reFindNumbers3, '.__int__$1').replace(reFindMultiplePeriods, '.').split('.').map(function (d) {
    if (d.indexOf('__int__') === 0) {
      return parseInt(d.substring('__int__'.length), 10);
    }

    return d;
  });
}

function loopObject(obj, fn, callback) {
  Object.keys(obj).forEach(function (key) {
    callback(fn(obj[key], key), key);
  });
}

function someObject(obj, fn) {
  var found = false;
  loopObject(obj, fn, function (result, key) {
    if (found) {
      return;
    }

    if (result) {
      found = true;
    }
  });
  return found;
}

var defaultDefaultValue = {};

function makeState(decor) {
  return _objectSpread({
    meta: {
      isSubmitting: false,
      isTouched: false,
      isSubmitted: false,
      submissionAttempts: 0
    },
    __fieldMeta: {}
  }, decor);
}

function useForm() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      onSubmit = _ref.onSubmit,
      _ref$defaultValues = _ref.defaultValues,
      defaultValues = _ref$defaultValues === void 0 ? defaultDefaultValue : _ref$defaultValues,
      validate = _ref.validate,
      validatePristine = _ref.validatePristine,
      debugForm = _ref.debugForm;

  var _React$useState = React.useState(function () {
    return makeState({
      values: defaultValues
    });
  }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      _React$useState2$ = _React$useState2[0],
      values = _React$useState2$.values,
      meta = _React$useState2$.meta,
      __fieldMeta = _React$useState2$.__fieldMeta,
      setState = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      shouldResubmit = _React$useState4[0],
      setShouldResubmit = _React$useState4[1];

  var apiRef = React.useRef();
  var metaRef = React.useRef({});

  var __fieldMetaRefsRef = React.useRef({}); // Keep validate up to date with the latest version


  metaRef.current.validate = validate;
  var fieldsAreValidating = someObject(__fieldMeta, function (field) {
    return field && field.isValidating;
  });
  var fieldsAreValid = !someObject(__fieldMeta, function (field) {
    return field && field.error;
  }); // Can we submit this form?

  var isValid = !fieldsAreValidating && fieldsAreValid && !meta.error;
  var canSubmit = isValid && !meta.isValidating && !meta.isSubmitting; // Decorate form meta

  meta = React.useMemo(function () {
    return _objectSpread({}, meta, {
      fieldsAreValidating: fieldsAreValidating,
      fieldsAreValid: fieldsAreValid,
      isValid: isValid,
      canSubmit: canSubmit
    });
  }, [meta, fieldsAreValidating, fieldsAreValid, isValid, canSubmit]); // We want the apiRef to change every time state updates

  var api = React.useMemo(function () {
    return {
      values: values,
      meta: meta,
      __fieldMeta: __fieldMeta,
      debugForm: debugForm
    };
  }, [debugForm, __fieldMeta, meta, values]); // Keep the apiRef up to date with the latest version of the api

  apiRef.current = api;
  var reset = React.useCallback(function () {
    setState(function () {
      return makeState({
        values: defaultValues
      });
    });
  }, [defaultValues, setState]); // On submit

  var handleSubmit = React.useCallback(async function () {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (e.persist) e.persist();
    if (e.preventDefault) e.preventDefault(); // This lets sub-forms with form elements (despite them being invalid HTML)
    // handle submissions without triggering parent forms

    if (e.__handled) {
      return;
    }

    e.__handled = true;

    for (var retries = 0; retries < 10; retries += 1) {
      if (apiRef.current.meta.fieldsAreValidating || apiRef.current.meta.isValidating) {
        await new Promise(function (resolve) {
          return setTimeout(resolve, 100);
        });
      }
    } // Don't let invalid forms submit


    if (!apiRef.current.meta.isValid) {
      // If the form can't submit, let's trigger all of the fields
      // to be touched. Thus, their validations will run
      apiRef.current.setMeta({
        isSubmitting: false
      });
      return;
    }

    apiRef.current.setMeta({
      isSubmitting: true
    });
    var needsResubmit = false;
    var fieldValidationPromises = [];
    Object.keys(apiRef.current.__fieldMetaRefs).forEach(function (key) {
      var fieldMeta = apiRef.current.__fieldMetaRefs[key].current;
      Object.keys(fieldMeta.instanceRefs).forEach(function (key) {
        var fieldInstance = fieldMeta.instanceRefs[key].current; // If any fields are not touched

        if (!fieldInstance.meta.isTouched) {
          // Mark them as touched
          fieldInstance.setMeta({
            isTouched: true
          }); // Likewise, if they need validation

          if (fieldInstance.__validate) {
            // Run their validation and keep track of the
            // promise
            fieldValidationPromises.push(fieldInstance.runValidation());
          }
        }
      });
    }); // If any validation needed to be run

    if (fieldValidationPromises.length) {
      // Mark for resubmission
      needsResubmit = true;
    }

    if (!apiRef.current.meta.isTouched) {
      // Mark for resubmission
      needsResubmit = true; // Mark the form as touched

      apiRef.current.setMeta(function (old) {
        return _objectSpread({}, old, {
          isTouched: true
        });
      });
    }

    if (needsResubmit) {
      // Wait for any field validations to complete
      await Promise.all(fieldValidationPromises); // Be sure to run validation for the form
      // and wait for it to complete

      await apiRef.current.runValidation(); // Then rerun the submission attempt

      e.__handled = false;
      setShouldResubmit(e || true); // Do not continue

      return;
    }

    apiRef.current.setMeta(function (old) {
      return _objectSpread({}, old, {
        // Submittion attempts mark the form as not submitted
        isSubmitted: false,
        // Count submission attempts
        submissionAttempts: old.submissionAttempts + 1
      });
    });

    try {
      // Run the submit code
      await apiRef.current.onSubmit(apiRef.current.values, apiRef.current);
      apiRef.current.setMeta({
        isSubmitted: true
      });
    } catch (err) {
      throw err;
    } finally {
      apiRef.current.setMeta({
        isSubmitting: false
      });
    }
  }, []); // Create a debounce for this field hook instance (not all instances)

  var debounce = useAsyncDebounce();
  var setMeta = React.useCallback(function (updater) {
    setState(function (old) {
      return _objectSpread({}, old, {
        meta: typeof updater === 'function' ? updater(old.meta) : _objectSpread({}, old.meta, updater)
      });
    });
  }, [setState]);
  var runValidation = React.useCallback(function () {
    if (!metaRef.current.validate) {
      return;
    }

    apiRef.current.setMeta({
      isValidating: true
    }); // Use the validationCount for all field instances to
    // track freshness of the validation

    var id = (metaRef.current.validationCount || 0) + 1;
    metaRef.current.validationCount = id;

    var checkLatest = function checkLatest() {
      return id === metaRef.current.validationCount;
    };

    if (!metaRef.current.validationPromise) {
      metaRef.current.validationPromise = new Promise(function (resolve, reject) {
        metaRef.current.validationResolve = resolve;
        metaRef.current.validationReject = reject;
      });
    }

    var doValidation = async function doValidation() {
      try {
        var error = await metaRef.current.validate(apiRef.current.values, apiRef.current);

        if (checkLatest()) {
          apiRef.current.setMeta({
            isValidating: false
          });

          if (typeof error !== 'undefined') {
            if (error) {
              if (typeof error === 'string') {
                apiRef.current.setMeta({
                  error: error
                });
              }
            } else {
              apiRef.current.setMeta({
                error: null
              });
            }
          }

          metaRef.current.validationResolve();
        }
      } catch (err) {
        if (checkLatest()) {
          metaRef.current.validationReject(err);
        }
      } finally {
        delete metaRef.current.validationPromise;
      }
    };

    doValidation();
    return metaRef.current.validationPromise;
  }, []);
  var getFieldValue = React.useCallback(function (field) {
    return getBy(apiRef.current.values, field);
  }, []);
  var getFieldMeta = React.useCallback(function (field) {
    var fieldID = getFieldID(field);
    return apiRef.current.__fieldMeta[fieldID];
  }, []);

  var __getFieldMetaRef = React.useCallback(function (field) {
    var fieldID = getFieldID(field);

    if (!apiRef.current.__fieldMetaRefs[fieldID]) {
      apiRef.current.__fieldMetaRefs[fieldID] = {
        current: {
          instanceRefs: {}
        }
      };
    }

    return apiRef.current.__fieldMetaRefs[fieldID];
  }, []);

  var setFieldMeta = React.useCallback(function (field, updater) {
    var fieldID = getFieldID(field);
    setState(function (old) {
      var newFieldMeta = typeof updater === 'function' ? updater(old.__fieldMeta[fieldID]) : _objectSpread({}, old.__fieldMeta[fieldID], updater);
      return _objectSpread({}, old, {
        // Any errors in fields should visually stop
        // form.isSubmitting
        meta: newFieldMeta && newFieldMeta.error ? _objectSpread({}, old.meta, {
          isSubmitting: false
        }) : old.meta,
        __fieldMeta: _objectSpread({}, old.__fieldMeta, _defineProperty({}, fieldID, newFieldMeta))
      });
    });
  }, [setState]);
  var setFieldValue = React.useCallback(function (field, updater) {
    var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref2$isTouched = _ref2.isTouched,
        isTouched = _ref2$isTouched === void 0 ? true : _ref2$isTouched;

    var fieldInstances = apiRef.current.__getFieldInstances(field);

    setState(function (old) {
      var newValue = typeof updater === 'function' ? updater(getBy(old.values, field)) : updater;
      fieldInstances.forEach(function (instance) {
        if (instance.current.__filterValue) {
          newValue = instance.current.__filterValue(newValue, apiRef.current);
        }
      });
      return _objectSpread({}, old, {
        values: setBy(old.values, field, newValue)
      });
    });

    if (isTouched) {
      apiRef.current.setFieldMeta(field, {
        isTouched: true
      });
      apiRef.current.setMeta({
        isTouched: true
      });
    }
  }, [setState]);

  var __getFieldInstances = React.useCallback(function (field) {
    var __metaRef = apiRef.current.__getFieldMetaRef(field);

    return Object.keys(__metaRef.current.instanceRefs).map(function (key) {
      return __metaRef.current.instanceRefs[key];
    });
  }, []);

  var pushFieldValue = React.useCallback(function (field, value, options) {
    apiRef.current.setFieldValue(field, function (old) {
      return [].concat(_toConsumableArray(Array.isArray(old) ? old : []), [value]);
    }, options);
  }, []);
  var insertFieldValue = React.useCallback(function (field, index, value, options) {
    apiRef.current.setFieldValue(field, function (old) {
      if (Array.isArray(old)) {
        return old.map(function (d, i) {
          return i === index ? value : d;
        });
      } else {
        throw Error("Cannot insert a field value into a non-array field. Check that this field's existing value is an array: ".concat(field, "."));
      }
    }, options);
  }, []);
  var removeFieldValue = React.useCallback(function (field, index, options) {
    apiRef.current.setFieldValue(field, function (old) {
      if (Array.isArray(old)) {
        return old.filter(function (d, i) {
          return i !== index;
        });
      } else {
        throw Error("Cannot remove a field value from a non-array field. Check that this field's existing value is an array: ".concat(field, "."));
      }
    }, options);
  }, []);
  var swapFieldValues = React.useCallback(function (path, index1, index2) {
    setState(function (old) {
      var old1 = getBy(old.values, [path, index1]);
      var old2 = getBy(old.values, [path, index2]);
      var values = setBy(old.values, [path, index1], old2);
      values = setBy(values, [path, index2], old1);
      return _objectSpread({}, old, {
        values: values
      });
    });
  }, [setState]);
  var setValues = React.useCallback(function (values) {
    setState(function (old) {
      return _objectSpread({}, old, {
        values: values
      });
    });
  }, [setState]); // Create the Form element if necessary

  var Form = useFormElement(api);
  Object.assign(api, {
    __fieldMetaRefs: __fieldMetaRefsRef.current,
    onSubmit: onSubmit,
    reset: reset,
    handleSubmit: handleSubmit,
    debounce: debounce,
    setMeta: setMeta,
    runValidation: runValidation,
    getFieldValue: getFieldValue,
    getFieldMeta: getFieldMeta,
    __getFieldMetaRef: __getFieldMetaRef,
    setFieldMeta: setFieldMeta,
    setFieldValue: setFieldValue,
    __getFieldInstances: __getFieldInstances,
    pushFieldValue: pushFieldValue,
    insertFieldValue: insertFieldValue,
    removeFieldValue: removeFieldValue,
    swapFieldValues: swapFieldValues,
    setValues: setValues,
    Form: Form,
    formContext: api
  }); // If shouldResubmit is true, do yo thang

  React.useEffect(function () {
    if (shouldResubmit) {
      handleSubmit(shouldResubmit);
      setShouldResubmit(false);
    }
  }, [handleSubmit, shouldResubmit]); // When the form gets dirty and when the value changes
  // validate

  React.useEffect(function () {
    if (!validatePristine && !meta.isTouched) {
      return;
    }

    apiRef.current.runValidation(values);
  }, [meta.isTouched, validatePristine, values]); // When defaultValues update, set them

  React.useEffect(function () {
    if (defaultValues !== apiRef.current.values) {
      setState(function (old) {
        return _objectSpread({}, old, {
          values: defaultValues
        });
      });
    }
  }, [defaultValues, setState]); // Return the root form and the Form component to the hook user

  return apiRef.current;
}

function useFieldScope(contextValue) {
  var FieldScopeRef = React.useRef();
  var FieldScopeApiRef = React.useRef();
  FieldScopeApiRef.current = contextValue; // Create a new form element

  if (!FieldScopeRef.current) {
    FieldScopeRef.current = function Field(_ref) {
      var children = _ref.children;
      return React.createElement(FormContextProvider, {
        value: FieldScopeApiRef.current
      }, children);
    };
  }

  return FieldScopeRef.current;
}

var uid = 0;
var methodMap = ['setFieldValue', 'setFieldMeta', 'pushFieldValue', 'insertFieldValue', 'removeFieldValue', 'swapFieldValues'];
var defaultDefaultMeta = {
  error: null,
  isTouched: false,
  isValidating: false
};
function useField(fieldName) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      defaultValue = _ref.defaultValue,
      _ref$defaultIsTouched = _ref.defaultIsTouched,
      defaultIsTouched = _ref$defaultIsTouched === void 0 ? false : _ref$defaultIsTouched,
      _ref$defaultError = _ref.defaultError,
      defaultError = _ref$defaultError === void 0 ? null : _ref$defaultError,
      _ref$defaultMeta = _ref.defaultMeta,
      defaultMeta = _ref$defaultMeta === void 0 ? defaultDefaultMeta : _ref$defaultMeta,
      validatePristine = _ref.validatePristine,
      validate = _ref.validate,
      filterValue = _ref.filterValue,
      manualFormContext = _ref.formContext;

  if (!fieldName) {
    throw new Error("useField: A field is required to use this hook. eg, useField('myField', options)");
  }

  var formApiRef = React.useRef();
  var fieldApiRef = React.useRef({});
  var formApi = useFormContext(manualFormContext);
  var instanceIDRef = React.useRef(uid++);
  var instanceID = instanceIDRef.current; // Support field prefixing from FieldScope

  var fieldPrefix = '';

  if (formApi.fieldName) {
    fieldPrefix = "".concat(formApi.fieldName, ".");
    formApi = formApi.form;
  }

  fieldName = fieldPrefix + fieldName; // Create a debounce for this field hook instance (not all instances)

  var debounce = useAsyncDebounce(); // An escape hatch for accessing latest formAPI

  formApiRef.current = formApi; // Get the field value, meta, and metaRef

  var preValue = formApi.getFieldValue(fieldName);
  var preMeta = formApi.getFieldMeta(fieldName);

  var __metaRef = formApi.__getFieldMetaRef(fieldName); // Handle default value


  var value = React.useMemo(function () {
    return typeof preValue === 'undefined' && typeof defaultValue !== 'undefined' ? defaultValue : preValue;
  }, [defaultValue, preValue]); // Handle default meta

  var meta = React.useMemo(function () {
    return typeof preMeta === 'undefined' ? _objectSpread({}, defaultMeta, {
      error: defaultError,
      isTouched: defaultIsTouched
    }) : preMeta;
  }, [defaultError, defaultMeta, defaultIsTouched, preMeta]); // Create the fieldApi

  var fieldApi = React.useMemo(function () {
    return {
      value: value,
      meta: meta,
      form: formApi,
      fieldName: fieldName
    };
  }, [fieldName, formApi, meta, value]); // Keep the fieldApiRef up to date

  fieldApiRef.current = fieldApi;
  fieldApiRef.current.__filterValue = filterValue;
  fieldApiRef.current.__validate = validate; // Let's scope some field-level methods for convenience

  var _methodMap$map = methodMap.map(function (d) {
    // Since this array is stable and always the same, we can disable
    // the react-hooks linter here:
    // eslint-disable-next-line
    return React.useCallback(function () {
      var _formApiRef$current;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return (_formApiRef$current = formApiRef.current)[d].apply(_formApiRef$current, [fieldName].concat(args));
    }, // eslint-disable-next-line
    [fieldName]);
  }),
      _methodMap$map2 = _slicedToArray(_methodMap$map, 6),
      setValue = _methodMap$map2[0],
      setMeta = _methodMap$map2[1],
      pushValue = _methodMap$map2[2],
      insertValue = _methodMap$map2[3],
      removeValue = _methodMap$map2[4],
      swapValues = _methodMap$map2[5]; // Let's scope some field-level methods for convenience


  var _methodMap$map3 = methodMap.map(function (d) {
    // Since this array is stable and always the same, we can disable
    // the react-hooks linter here:
    // eslint-disable-next-line
    return React.useCallback(function (subField) {
      var _formApiRef$current2;

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      return (_formApiRef$current2 = formApiRef.current)[d].apply(_formApiRef$current2, ["".concat(fieldName, ".").concat(subField)].concat(args));
    }, // eslint-disable-next-line
    [fieldName]);
  }),
      _methodMap$map4 = _slicedToArray(_methodMap$map3, 6),
      setFieldValue = _methodMap$map4[0],
      setFieldMeta = _methodMap$map4[1],
      pushFieldValue = _methodMap$map4[2],
      insertFieldValue = _methodMap$map4[3],
      removeFieldValue = _methodMap$map4[4],
      swapFieldValues = _methodMap$map4[5];

  var runValidation = React.useCallback(async function () {
    if (!fieldApiRef.current.__validate) {
      return;
    }

    setMeta({
      isValidating: true
    }); // Use the validationCount for all field instances to
    // track freshness of the validation

    var id = (__metaRef.current.validationCount || 0) + 1;
    __metaRef.current.validationCount = id;

    var checkLatest = function checkLatest() {
      return id === __metaRef.current.validationCount;
    };

    if (!__metaRef.current.validationPromise) {
      __metaRef.current.validationPromise = new Promise(function (resolve, reject) {
        __metaRef.current.validationResolve = resolve;
        __metaRef.current.validationReject = reject;
      });
    }

    var doValidate = async function doValidate() {
      try {
        var error = await fieldApiRef.current.__validate(fieldApiRef.current.value, fieldApiRef.current);

        if (checkLatest()) {
          setMeta({
            isValidating: false
          });

          if (typeof error !== 'undefined') {
            if (error) {
              if (typeof error === 'string') {
                setMeta({
                  error: error
                });
              }
            } else {
              setMeta({
                error: null
              });
            }
          }

          __metaRef.current.validationResolve();
        }
      } catch (error) {
        if (checkLatest()) {
          __metaRef.current.validationReject(error);

          throw error;
        }
      } finally {
        if (checkLatest()) {
          setMeta({
            isValidating: false
          });
          delete __metaRef.current.validationPromise;
        }
      }
    };

    doValidate();
    return __metaRef.current.validationPromise;
  }, [__metaRef, setMeta]);
  var getInputProps = React.useCallback(function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _onChange = _ref2.onChange,
        _onBlur = _ref2.onBlur,
        rest = _objectWithoutProperties(_ref2, ["onChange", "onBlur"]);

    return _objectSpread({
      value: value,
      onChange: function onChange(e) {
        setValue(e.target.value);

        if (_onChange) {
          _onChange(e);
        }
      },
      onBlur: function onBlur(e) {
        setMeta({
          isTouched: true
        });

        if (_onBlur) {
          _onBlur(e);
        }
      }
    }, rest);
  }, [setMeta, setValue, value]);
  var FieldScope = useFieldScope(fieldApi); // Fill in the rest of the fieldApi

  Object.assign(fieldApi, {
    __metaRef: __metaRef,
    setValue: setValue,
    setMeta: setMeta,
    pushValue: pushValue,
    insertValue: insertValue,
    removeValue: removeValue,
    swapValues: swapValues,
    setFieldValue: setFieldValue,
    setFieldMeta: setFieldMeta,
    pushFieldValue: pushFieldValue,
    insertFieldValue: insertFieldValue,
    removeFieldValue: removeFieldValue,
    swapFieldValues: swapFieldValues,
    debounce: debounce,
    runValidation: runValidation,
    getInputProps: getInputProps,
    FieldScope: FieldScope
  });
  React.useEffect(function () {
    var _formApiRef$current$_ = formApiRef.current.__getFieldMetaRef(fieldName),
        meta = _formApiRef$current$_.current;

    meta.instanceRefs = meta.instanceRefs || {};
    meta.instanceRefs[instanceID] = fieldApiRef;
    var fieldID = getFieldID(fieldName);
    return function () {
      delete meta.instanceRefs[instanceID];

      if (!Object.keys(meta.instanceRefs).length) {
        fieldApiRef.current.setMeta(function () {
          return undefined;
        });
        delete formApiRef.current.__fieldMetaRefs[fieldID];
      }
    };
  }, [fieldName, instanceID]); // The default value effect handler

  React.useEffect(function () {
    if (typeof preValue === 'undefined' && typeof value !== 'undefined') {
      setValue(value, {
        isTouched: false
      });
    }
  }, [preValue, setValue, value]); // The default meta effect handler

  React.useEffect(function () {
    if (typeof preMeta === 'undefined' && typeof meta !== 'undefined') {
      setMeta(meta);
    }
  }, [fieldName, meta, preMeta, setMeta, setValue, value]); // When the form gets dirty and when the value changes, run the validation

  React.useEffect(function () {
    setTimeout(function () {
      var _formApiRef$current$g;

      var isTouched = meta.isTouched || ((_formApiRef$current$g = formApiRef.current.getFieldMeta(fieldName)) === null || _formApiRef$current$g === void 0 ? void 0 : _formApiRef$current$g.isTouched);

      if (!validatePristine && !isTouched) {
        return;
      }

      try {
        runValidation(value);
      } catch (err) {
        console.error('An error occurred during validation', err);
      }
    }, 0);
  }, [meta.isTouched, fieldName, runValidation, validatePristine, value]);
  return fieldApiRef.current;
}

exports.splitFormProps = splitFormProps;
exports.useField = useField;
exports.useForm = useForm;
exports.useFormContext = useFormContext;
//# sourceMappingURL=index.js.map