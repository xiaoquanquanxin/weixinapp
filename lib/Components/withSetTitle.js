function withSetTitle(WrapperComponent, title) {
    document.title = title
    return WrapperComponent
}
export default withSetTitle