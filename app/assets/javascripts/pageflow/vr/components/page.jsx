(function() {
  const {classNames} = pageflow.react;

  const {
    PageWithInteractiveBackground, PageBackgroundImage,
    PageWrapper, PageBackground, PageShadow, PageContent, PageHeader, PageText, Icon,
  } = pageflow.react.components;

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
        if (!this.props.page.autoplay) {
          this.setState({isInBackground: false});
        }
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
                                       defaultControlBarText={props.i18n.t('pageflow.public.vr.start')}
                                       qualityMenuButtonTitle={props.i18n.t('pageflow.public.vr.select_quality')}
                                       qualityMenuItems={this.qualityMenuItems()}
                                       additionalMenuBarButtons={this.additionalMenuBarButtons()}
                                       onAdditionalButtonClick={this.onCardboardButtonClick}
                                       onEnterBackground={this.onEnterBackground}
                                       onLeaveBackground={this.onLeaveBackground}
                                       onQualityMenuItemClick={props.onQualityChange}>

          <VrView id={props.page.permaId}
                  videoId={props.page.videoId}
                  autoplay={props.page.autoplay}
                  startYaw={props.page.startYaw}
                  quality={this.activeQuality()}
                  isStereo={props.page.isStereo}
                  isPlaying={props.pageState.isActive && (this.state.isInBackground || props.page.autoplay)}
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
          <PageBackground>
            <PageBackgroundImage page={props.page} imagePropertyBaseName="fallbackImage" />
            <PageShadow page={props.page} />
          </PageBackground>

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
      const i18n = this.props.i18n;
      const activeQuality = this.activeQuality();

      return this.availableQualitiesInDescendingOrder().map(value => {
        return {
          value,
          label: i18n.t(`pageflow.public.vr.video_qualities.${value}`),
          annotation: i18n.t(`pageflow.public.vr.video_quality_annotations.${value}`),
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
            label: this.props.i18n.t('pageflow.public.vr.start_cardboard'),
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
        return this.availableQualitiesInDescendingOrder()[0];
      }
    }

    availableQualitiesInDescendingOrder() {
      return ['4k', 'fullhd', 'high'].filter(quality =>
        this.props.page.videoFile && this.props.page.videoFile[quality]
      );
    }
  }

  const {resolve, mutate,
         createPage, createContainer, withPageStateProp} = pageflow.react;

  const qualitySetting = 'vr.videoQuality';

  pageflow.vr.Page = createPage(createContainer(withPageStateProp(Page), {
    fragments: {
      i18n: resolve('i18n'),
      page: {
        videoFile: resolve('videoFile', {
          property: 'videoId'
        }),
      },
      requestedQuality: resolve('setting', {
        property: qualitySetting
      }),
      onQualityChange: mutate('setting', {
        property: qualitySetting
      })
    }
  }));
}());
