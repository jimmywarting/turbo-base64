{
    let wasm
    let cachedUint8Memory0 = new Uint8Array()
    let cachedInt32Memory0 = new Int32Array()
    let WASM_VECTOR_LEN = 0
    const imports = { wbg: {} }
    const req = fetch(new URL('base_bg.wasm', import.meta.url))

    function getUint8Memory0 () {
        if (cachedUint8Memory0.byteLength === 0) {
            cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer)
        }
        return cachedUint8Memory0
    }

    function passArray8ToWasm0 (arg, malloc) {
        const ptr = malloc(arg.length * 1)
        getUint8Memory0().set(arg, ptr / 1)
        WASM_VECTOR_LEN = arg.length
        return ptr
    }

    function getInt32Memory0 () {
        if (cachedInt32Memory0.byteLength === 0) {
            cachedInt32Memory0 = new Int32Array(wasm.memory.buffer)
        }
        return cachedInt32Memory0
    }

    function getArrayU8FromWasm0 (ptr, len) {
        return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len)
    }

    /**
     * @param {Uint8Array} bytes
     * @returns {Uint8Array}
     */
    var encode = (bytes) => {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16)
            const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc)
            const len0 = WASM_VECTOR_LEN
            wasm.encode(retptr, ptr0, len0)
            const r0 = getInt32Memory0()[retptr / 4 + 0]
            const r1 = getInt32Memory0()[retptr / 4 + 1]
            const v1 = getArrayU8FromWasm0(r0, r1).slice()
            wasm.__wbindgen_free(r0, r1 * 1)
            return v1
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16)
        }
    }

    /**
     * @param {Uint8Array} encoded
     * @returns {Uint8Array}
     */
    var decode = (encoded) => {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16)
            const ptr0 = passArray8ToWasm0(encoded, wasm.__wbindgen_malloc)
            const len0 = WASM_VECTOR_LEN
            wasm.decode(retptr, ptr0, len0)
            const r0 = getInt32Memory0()[retptr / 4 + 0]
            const r1 = getInt32Memory0()[retptr / 4 + 1]
            const v1 = getArrayU8FromWasm0(r0, r1).slice()
            wasm.__wbindgen_free(r0, r1 * 1)
            return v1
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16)
        }
    }

    var { instance, module } = await WebAssembly.instantiateStreaming(
        req,
        imports
    )

    wasm = instance.exports
}

export { encode, decode, instance, module }