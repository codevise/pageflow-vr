(function() {
  const {classNames} = pageflow.react;

  const {
    PageWithInteractiveBackground,
    PageWrapper, PageContent, PageHeader, PageText, Icon,
  } = pageflow.react.components;

  const {MediaPageBackground} = pageflow.react.components;

  const {
    VrView, NoVrView
  } = pageflow.vr;

  class Page extends React.Component {
    constructor(props, context) {
      super(props, context);

      this.state = {
        isVrViewReady: false,
        isVrViewPlaying: false
      };

      this.onVrViewLoading = () => {
        this.setState({isVrViewReady: false});
      };

      this.onVrViewReady = () => {
        this.setState({isVrViewReady: true});
      };

      this.onEnterBackground = () => {
        this.setState({isInBackground: true});
      };

      this.onLeaveBackground = () => {
        this.setState({isInBackground: false});
      };

      this.onCardboardButtonClick = () => {
        this.setState({isCardboardModeRequested: true});
      };

      this.onExitCardboardMode = () => {
        this.setState({isCardboardModeRequested: false});
      };
    }

    render() {
      if (!pageflow.browser || !pageflow.browser.has('vr view support') ||
          (PAGEFLOW_EDITOR && this.props.page.previewVrFallback)) {
        return this.renderFallbackPage();
      }
      else {
        return this.renderVrViewPage();
      }
    }

    renderVrViewPage() {
      const props = this.props;

      return (
        <PageWithInteractiveBackground page={props.page}
                                       playButtonIconName="pageflow-vr.play"
                                       defaultControlBarText={props.t('pageflow.public.vr.start')}
                                       qualityMenuButtonTitle={props.t('pageflow.public.vr.select_quality')}
                                       qualityMenuItems={this.qualityMenuItems()}
                                       additionalMenuBarButtons={this.additionalMenuBarButtons()}
                                       onAdditionalButtonClick={this.onCardboardButtonClick}
                                       onEnterBackground={this.onEnterBackground}
                                       onLeaveBackground={this.onLeaveBackground}
                                       onQualityMenuItemClick={props.onQualityChange}>

          <VrView id={props.page.permaId}
                  videoId={props.page.videoId}
                  posterId={props.page.posterId}
                  startYaw={props.page.startYaw}
                  quality={this.activeQuality()}
                  isPlaying={props.pageIsActive && (this.state.isInBackground || props.page.autoplay)}
                  isCardboardModeRequested={this.state.isCardboardModeRequested}
                  onLoading={this.onVrViewLoading}
                  onReady={this.onVrViewReady}
                  onExitCardboardMode={this.onExitCardboardMode} />

          {this.renderLoadingIndicator()}
        </PageWithInteractiveBackground>
      );
    }

    renderLoadingIndicator() {
      const className = classNames('pageflow_vr-page_loading_indicator',
                                   {'pageflow_vr-page_loading_indicator-hidden': this.state.isVrViewReady});
      return (
        <div className={className}>
          <Icon name="pageflow-vr.play" className="pageflow_vr-page_loading_indicator_icon" />
        </div>
      );
    }

    renderFallbackPage() {
      const props = this.props;

      return (
        <PageWrapper>
          <MediaPageBackground page={props.page}
                               propertyNamePrefix="fallback" />

          <PageContent>
            <PageHeader page={props.page} />
            <PageText page={props.page} />

            <NoVrView text={props.page.fallbackText}
                      youTubeUrl={props.page.fallbackYouTubeUrl} />
          </PageContent>
        </PageWrapper>
      );
    }

    qualityMenuItems() {
      const t = this.props.t;
      const activeQuality = this.activeQuality();

      return this.availableQualitiesInDescendingOrder().map(value => {
        return {
          value,
          label: t(`pageflow.public.vr.video_qualities.${value}`),
          annotation: t(`pageflow.public.vr.video_quality_annotations.${value}`),
          active: activeQuality == value,
        };
      });
    }

    additionalMenuBarButtons() {
      if (!pageflow.browser || !pageflow.browser.has('vr view cardboard support')) {
        return [];
      }
      else {
        return [
          {
            name: 'cardboard',
            label: this.props.t('pageflow.public.vr.start_cardboard'),
            iconName: 'pageflow-vr.cardboard'
          }
        ];
      }
    }

    activeQuality() {
      if (this.availableQualitiesInDescendingOrder().indexOf(this.props.requestedQuality) >= 0) {
        return this.props.requestedQuality;
      }
      else {
        return this.fullHdOrHighQuality();
      }
    }

    fullHdOrHighQuality() {
      var qualities = this.availableQualitiesInDescendingOrder();
      return qualities[1] || qualities[0];
    }

    availableQualitiesInDescendingOrder() {
      return ['4k', 'fullhd', 'high'].filter(quality =>
        this.props.videoFile && this.props.videoFile.urls[quality]
      );
    }
  }

  const {registerPageType, connectInPage, combine, combineReducers} = pageflow.react;
  const {pageAttributes, pageAttribute, pageIsActive, t, setting, file} = pageflow.react.selectors;
  const {updateSetting} = pageflow.react.actions;

  const qualitySetting = 'vr.videoQuality';

  registerPageType('vr', {
    component: connectInPage(
      combine({
        page: pageAttributes(),
        pageIsActive: pageIsActive(),
        videoFile: file('videoFiles', {
          id: pageAttribute('videoId')
        }),
        t,
        requestedQuality: setting({
          property: qualitySetting
        })
      }),
      {
        onQualityChange: value => updateSetting({
          property: qualitySetting,
          value
        })
      }
    )(Page),

    reduxModules: [
      pageflow.react.mediaPageBackgroundReduxModule
    ]
  });
}());
