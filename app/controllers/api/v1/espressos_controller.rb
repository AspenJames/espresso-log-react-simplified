module Api 
  module V1
    class EspressosController < ApplicationController
      def index
        render :json => Origin.find(params[:origin_id]).espressos
      end

      def create
        origin = Origin.find(params[:origin_id])
        e = origin.espressos.build(espresso_params)
        if e.save
          render :json => e
        else
          render :json => e.errors.full_messages
        end
      end

      def destroy
        esp = Espresso.find(params[:id])
        esp.destroy
        render :json => {"destroy": esp}
      end

      private
      def espresso_params
        params.require(:espresso).permit(:dose, :yield, :time, :notes, :days_off_roast)
      end
    end
  end
end
